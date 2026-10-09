using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Interfaces.Templates;

public static class EmailVerificationTemplate
{
    public static string Generate(string otp, string confirmationUrl)
    {
        return $$"""
            <html>
            <body style="font-family:Arial,sans-serif;">
                <h1>CaspianEra</h1>
                <h2>Email Verification</h2>

                <p>Your verification code:</p>
                <h1>{{otp}}</h1>

                <p>This code expires in 10 minutes.</p>

                <a href="{{confirmationUrl}}">
                    Confirm Email
                </a>
            </body>
            </html>
            """;
    }
}
