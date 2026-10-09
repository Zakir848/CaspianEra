using CaspianEra.API.Helper;
using CaspianEra.Application.Auth.DTOs;
using CaspianEra.Application.Auth.Interface;
using CaspianEra.Application.Interfaces.Service;
using CaspianEra.Application.Interfaces.Services;
using CaspianEra.Domain.Entities.Email;
using CaspianEra.Domain.Entities.Users;
using CaspianEra.Infratructure.Persistance;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace CaspianEra.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IAuthHelper _authHelper;
        private readonly AppDbContext _appDbContext;
        private readonly IEmailService _emailService;
        private readonly IOtpService _otpService;

        public AuthController(
            UserManager<AppUser> userManager,
            ITokenService tokenService,
            IAuthHelper authHelper,
            AppDbContext appDbContext,
            IEmailService emailService,
            IOtpService otpService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _authHelper = authHelper;
            _appDbContext = appDbContext;
            _otpService = otpService;
            _emailService = emailService;
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout(
        RefreshTokenRequest request)
        {
            var storedToken = await _appDbContext.RefreshTokens
                .FirstOrDefaultAsync(x =>
                    x.Token == request.RefreshToken
                );

            if (storedToken is not null)
            {
                storedToken.IsRevoked = true;
                storedToken.RevokedAt = DateTime.UtcNow;

                await _appDbContext.SaveChangesAsync();
            }

            return NoContent();
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<AuthResponse>> Refresh(
        RefreshTokenRequest request)
        {
            var storedToken = await _appDbContext.RefreshTokens
                .Include(x => x.User)
                .FirstOrDefaultAsync(x =>
                    x.Token == request.RefreshToken
                );

            if (storedToken is null)
            {
                return Unauthorized(new
                {
                    message = "Invalid refresh token."
                });
            }

            if (storedToken.IsRevoked)
            {
                return Unauthorized(new
                {
                    message = "Refresh token has been revoked."
                });
            }

            if (storedToken.ExpiresAt <= DateTime.UtcNow)
            {
                return Unauthorized(new
                {
                    message = "Refresh token has expired."
                });
            }

            storedToken.IsRevoked = true;
            storedToken.RevokedAt = DateTime.UtcNow;

            await _appDbContext.SaveChangesAsync();

            return Ok(
                await _authHelper.CreateAuthResponseAsync(storedToken.User)
            );
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(
            RegisterRequest request, CancellationToken cancellationToken = default)
        {
            var existingEmail =
                await _userManager.FindByEmailAsync(request.Email);


            if (existingEmail is not null)
            {
                return BadRequest(new
                {
                    message = "Email is already registered."
                });
            }

            var user = new AppUser
            {
                Id = Guid.NewGuid(),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                UserName = request.Email,
                CreatedAt = DateTime.UtcNow,
                Role = "User"
            };

            var result = await _userManager.CreateAsync(
                user,
                request.Password
            );

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    errors = result.Errors.Select(x => x.Description)
                });
            }

            var otp = _otpService.GenerateCode();

            var otpHash = _otpService.HashCode(user.Id, otp);

            var verification = new EmailVerificationCode
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                CodeHash = otpHash,
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddMinutes(10),
                FailedAttempts = 0
            };

            _appDbContext.EmailVerificationCodes.Add(verification);

            await _appDbContext.SaveChangesAsync(cancellationToken);

            var token = await _userManager
            .GenerateEmailConfirmationTokenAsync(user);

            var encodedToken = WebEncoders.Base64UrlEncode(
                Encoding.UTF8.GetBytes(token)
            );

            var confirmationUrl =
                $"http://192.168.31.183:5173/verify-email" +
                $"?userId={user.Id}" +
                $"&token={encodedToken}";

            await _emailService.SendVerificationEmailAsync(
                user.Email!,
                otp,
                confirmationUrl,
                cancellationToken
            );


            return Ok(new
            {
                message = "Registration successful. Please verify your email.",
                email = user.Email
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(
            LoginRequest request)
        {
            var user =
                await _userManager.FindByEmailAsync(request.Email);

            if (user is null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            if (!user.EmailConfirmed)
            {

                return StatusCode(403, new
                {
                    code = "EmailNotVerified",
                    message = "Your email address has not been verified. Please check your inbox and complete the verification process to continue."
                });
            }

            var passwordValid =
                await _userManager.CheckPasswordAsync(
                    user,
                    request.Password
                );

            if (!passwordValid)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            return Ok(
                await _authHelper.CreateAuthResponseAsync(user)
                );
        }

        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmailRequest request)
        {
            var user = await _userManager.FindByIdAsync(
                request.UserId.ToString()
            );

            if (user is null)
            {
                return BadRequest(new
                {
                    message = "Invalid user."
                });
            }

            if (user.EmailConfirmed)
            {
                return BadRequest(new
                {
                    message = "Email is already confirmed."
                });
            }

            byte[] tokenBytes;

            try
            {
                tokenBytes = WebEncoders.Base64UrlDecode(
                    request.Token
                );
            }
            catch
            {
                return BadRequest(new
                {
                    message = "Invalid confirmation token."
                });
            }

            var decodedToken =
                Encoding.UTF8.GetString(tokenBytes);

            var result = await _userManager.ConfirmEmailAsync(
                user,
                decodedToken
            );

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "Email confirmation failed."
                });
            }

            return Ok(new
            {
                message = "Email confirmed successfully."
            });
        }
    }
}
