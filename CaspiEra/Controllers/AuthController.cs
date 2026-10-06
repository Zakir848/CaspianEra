using CaspianEra.API.Helper;
using CaspianEra.Application.Auth.DTOs;
using CaspianEra.Application.Auth.Interface;
using CaspianEra.Domain.Entities.Users;
using CaspianEra.Infratructure.Persistance;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        public AuthController(
            UserManager<AppUser> userManager,
            ITokenService tokenService,
            IAuthHelper authHelper,
            AppDbContext appDbContext)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _authHelper = authHelper;
            _appDbContext = appDbContext;
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
            RegisterRequest request)
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

            return Ok(
                await _authHelper.CreateAuthResponseAsync(user)
                );
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
    }
}
