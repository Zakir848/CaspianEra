using CaspiEra.Domain.Entities.Hotels;
using CaspiEra.Domain.Entities.Reservations;
using CaspiEra.Domain.Entities.Token;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace CaspianEra.Domain.Entities.Users;

public class AppUser : IdentityUser<Guid>
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;

    public string? CoverImageUrl { get; set; }
    public string? ProfileImageUrl { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public bool IsOnline { get; set; }
    public DateTime? LastSeenAt { get; set; }
    public bool IsDeleted { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    public ICollection<Hotel> OwnerHotel { get; set; }
    = new List<Hotel>();
    public ICollection<Reservation> Reservations { get; set; }
        = new List<Reservation>();

    public ICollection<RefreshToken> RefreshTokens { get; set; }
    = new List<RefreshToken>();
}
