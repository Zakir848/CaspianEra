using CaspianEra.Application.Auth.DTOs;
using CaspianEra.Application.Auth.Interface;
using CaspianEra.Domain.Entities.Users;
using CaspianEra.Infratructure.Persistance;
using CaspiEra.Domain.Entities.Token;

namespace CaspianEra.API.Helper;

public class AuthHelper : IAuthHelper
{
    private readonly AppDbContext _dbContext;
    private readonly ITokenService _tokenService;


    public AuthHelper(AppDbContext dbContext, ITokenService tokenService)
    {
        _dbContext = dbContext;
        _tokenService = tokenService;
    }

    public async Task<AuthResponse> CreateAuthResponseAsync(AppUser user)
    {
        var accessToken =
            await _tokenService.CreateAccessTokenAsync(user);

        var refreshToken =
            _tokenService.CreateRefreshToken();

        var refreshTokenEntity = new RefreshToken
        {
            UserId = user.Id,
            Token = refreshToken.Token,
            ExpiresAt = refreshToken.ExpiresAt
        };

        _dbContext.RefreshTokens.Add(refreshTokenEntity);

        await _dbContext.SaveChangesAsync();

        return new AuthResponse
        {
            UserId = user.Id,
            Email = user.Email!,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Role = user.Role,

            AccessToken = accessToken.Token,
            AccessTokenExpiresAt = accessToken.ExpiresAt,

            RefreshToken = refreshToken.Token,
            RefreshTokenExpiresAt = refreshToken.ExpiresAt
        };
    }
}
