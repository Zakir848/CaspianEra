using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Interfaces.Service;

public interface IOtpService
{
    string GenerateCode();

    string HashCode(Guid userId, string code);

    bool VerifyCode(
        Guid userId,
        string code,
        string storedHash);
}
