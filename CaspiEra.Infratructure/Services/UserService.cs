using CaspianEra.Application.DTOs.Owners;
using CaspianEra.Application.Interfaces.Services;
using CaspianEra.Application.Models;
using CaspianEra.Domain.Entities.Users;
using CaspianEra.Infratructure.Persistance;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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

        var hotelOwner = new AppUser
        {
            Id = Guid.NewGuid(),
            UserName = email,
            Email = email,
            FirstName = firstname.Trim(),
            LastName = lastname.Trim(),
            Role = "HotelOwner",
        };

        // İstifadəçini yaradır və parolu hash edərək saxlayır.
        var createResult = await _userManager.CreateAsync(
            hotelOwner,
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
            hotelOwner,
            "HotelOwner");

        if (!roleResult.Succeeded)
        {
            var errors = string.Join(
                "; ",
                roleResult.Errors.Select(x => x.Description));

            throw new InvalidOperationException(errors);
        }

        await transaction.CommitAsync(cancellationToken);

        return hotelOwner.Id;
    }

    public async Task<PagedResult<OwnerListDto>> GetOwnersAsync(int page, int pageSize, CancellationToken cancellationToken)
    {
        var owner = await _context.Users
            .Where(u => u.Role == "HotelOwner")
            .Select(u => new OwnerListDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                HotelId = u.OwnerHotel.Where(x => x.OwnerId == u.Id).Select(x => x.Id).FirstOrDefault()!,
                HotelName = u.OwnerHotel.Where(x => x.OwnerId == u.Id).Select(x => x.Name).FirstOrDefault()!,
            })
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        var totalCount = owner.Count();

        return new PagedResult<OwnerListDto>
        {
            Items = owner,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize),
        };
    }
}
