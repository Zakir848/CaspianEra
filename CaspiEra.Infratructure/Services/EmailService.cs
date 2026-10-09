using CaspianEra.Application.Interfaces.Services;
using CaspianEra.Application.Interfaces.Templates;
using CaspianEra.Infratructure.Settings;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace CaspianEra.Infratructure.Services;

public class EmailService : IEmailService
{
    private readonly EmailSettings _settings;

    public EmailService(IOptions<EmailSettings> options)
    {
        _settings = options.Value;
    }

    public async Task SendEmailAsync(
        string to,
        string subject,
        string htmlBody,
        CancellationToken cancellationToken = default)
    {
        var message = new MimeMessage();

        // Sender
        message.From.Add(
            new MailboxAddress(
                _settings.FromName,
                _settings.FromEmail
            )
        );

        // Receiver
        message.To.Add(
            MailboxAddress.Parse(to)
        );

        // Subject
        message.Subject = subject;

        // Email body
        var bodyBuilder = new BodyBuilder
        {
            HtmlBody = htmlBody
        };

        message.Body = bodyBuilder.ToMessageBody();

        using var smtpClient = new SmtpClient();

        // Connect to SMTP server
        await smtpClient.ConnectAsync(
            _settings.Host,
            _settings.Port,
            SecureSocketOptions.StartTls,
            cancellationToken
        );

        // Authenticate
        await smtpClient.AuthenticateAsync(
            _settings.UserName,
            _settings.Password,
            cancellationToken
        );

        // Send email
        await smtpClient.SendAsync(
            message,
            cancellationToken
        );

        // Disconnect
        await smtpClient.DisconnectAsync(
            true,
            cancellationToken
        );
    }

    public async Task SendVerificationEmailAsync(string email, string otp, string confirmationUrl, CancellationToken cancellationToken = default)
    {
        var htmlBody = EmailVerificationTemplate.Generate(
        otp,
        confirmationUrl
        );

        await SendEmailAsync(
            email,
            "CaspianEra - Email Verification",
            htmlBody,
            cancellationToken
        );
    }
}
