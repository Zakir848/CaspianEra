using CaspianEra.Application.DTOs.Owners;
using CaspianEra.Application.Interfaces.Services;
using CaspianEra.Domain.Entities.Users;
using CaspianEra.Infratructure.Persistance;
using Microsoft.AspNetCore.Identity;

namespace CaspianEra.Infratructure.Services;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly AppDbContext _context;

    public UserService(UserManager<AppUser> userManager, AppDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<Guid> CreateOwnerAsync(CreateOwnerDto dto, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var firstname = dto.FirstName;
        var lastname = dto.LastName;
        var email = dto.Email;
        var password = dto.Password;

        if (string.IsNullOrWhiteSpace(firstname))
            throw new ArgumentException("The firstname cannot be empty.");

        if (string.IsNullOrWhiteSpace(lastname))
            throw new ArgumentException("The lastname cannot be empty.");

        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentException("The email cannot be empty.");

        if (string.IsNullOrWhiteSpace(password))
            throw new ArgumentException("The password cannot be empty.");

        email = email.Trim();

        var existingUser = await _userManager.FindByEmailAsync(email);

        if (existingUser is not null)
        {
            throw new InvalidOperationException(
         "A user with this email already exists.");
        }

        await using var transaction =
            await _context.Database.BeginTransactionAsync(
                cancellationToken);

        var user = new AppUser
        {
            Id = Guid.NewGuid(),
            UserName = email,
            Email = email,
            FirstName = firstname.Trim(),
            LastName = lastname.Trim()
        };

        // İstifadəçini yaradır və parolu hash edərək saxlayır.
        var createResult = await _userManager.CreateAsync(
            user,
            password);

        if (!createResult.Succeeded)
        {
            var errors = string.Join(
                "; ",
                createResult.Errors.Select(x => x.Description));

            throw new InvalidOperationException(errors);
        }

        // Yaradılmış istifadəçiyə owner rolu verir.
        var roleResult = await _userManager.AddToRoleAsync(
            user,
            "HotelOwner");

        if (!roleResult.Succeeded)
        {
            var errors = string.Join(
                "; ",
                roleResult.Errors.Select(x => x.Description));

            throw new InvalidOperationException(errors);
        }

        await transaction.CommitAsync(cancellationToken);

        return user.Id;
    }
}
