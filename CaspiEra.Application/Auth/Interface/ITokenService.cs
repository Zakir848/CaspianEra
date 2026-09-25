using CaspianEra.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Auth.Interface;

public interface ITokenService
{
    Task<(string Token, DateTime ExpiresAt)>
        CreateAccessTokenAsync(AppUser user);

    (string Token, DateTime ExpiresAt)
        CreateRefreshToken();
}
