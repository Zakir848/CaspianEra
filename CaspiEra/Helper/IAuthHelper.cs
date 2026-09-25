using CaspianEra.Application.Auth.DTOs;
using CaspianEra.Domain.Entities.Users;

namespace CaspianEra.API.Helper;
public interface IAuthHelper
{
    Task<AuthResponse> CreateAuthResponseAsync(AppUser user);
}
