using System.Security.Cryptography;
using System.Text;
using CaspianEra.Application.Interfaces.Service;
using CaspianEra.Application.Interfaces.Services;
using Microsoft.Extensions.Configuration;

namespace CaspianEra.Infratructure.Services;

public class OtpService : IOtpService
{
    private readonly byte[] _secretKey;

    public OtpService(IConfiguration configuration)
    {
        var secret = configuration["OtpSettings:SecretKey"];

        if (string.IsNullOrWhiteSpace(secret))
        {
            throw new InvalidOperationException(
                "OTP secret key is not configured.");
        }

        _secretKey = Convert.FromBase64String(secret);

        if (_secretKey.Length < 32)
        {
            throw new InvalidOperationException(
                "OTP secret key must contain at least 32 bytes.");
        }
    }

    public string GenerateCode()
    {
        return RandomNumberGenerator
            .GetInt32(100000, 1000000)
            .ToString();
    }

    public string HashCode(Guid userId, string code)
    {
        var value = $"{userId:N}:{code}";

        using var hmac = new HMACSHA256(_secretKey);

        var hash = hmac.ComputeHash(
            Encoding.UTF8.GetBytes(value)
        );

        return Convert.ToHexString(hash);
    }

    public bool VerifyCode(
        Guid userId,
        string code,
        string storedHash)
    {
        if (string.IsNullOrWhiteSpace(code) ||
            code.Length != 6 ||
            !code.All(char.IsAsciiDigit))
        {
            return false;
        }

        var calculatedHash = HashCode(userId, code);

        byte[] expected;
        byte[] actual;

        try
        {
            expected = Convert.FromHexString(storedHash);
            actual = Convert.FromHexString(calculatedHash);
        }
        catch (FormatException)
        {
            return false;
        }

        return CryptographicOperations.FixedTimeEquals(
            expected,
            actual
        );
    }
}