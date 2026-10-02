using CaspianEra.Domain.Entities.Users;
using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Images;
using CaspiEra.Domain.Entities.Locations;
using CaspiEra.Domain.Entities.Rooms;
namespace CaspiEra.Domain.Entities.Hotels;

public class Hotel : BaseEntity
{
    public string? No { get; set; }

    public int FloorCount { get; set; }
    public int? StarCount { get; set; }
    public int Rating { get; set; } = 0;

    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public Guid OwnerId { get; set; }
    public AppUser Owner { get; set; } = null!;

    public Guid CityId { get; set; }
    public City City { get; set; } = null!;

    public DateTime? ArchivedAt { get; set; }

    public ICollection<Room> Rooms { get; set; }
        = new List<Room>();

    public ICollection<RoomType> RoomTypes { get; set; }
        = new List<RoomType>();

    public ICollection<HotelImage> HotelImages { get; set; }
        = new List<HotelImage>();

    public ICollection<HotelReview> HotelReviews { get; set; }
        = new List<HotelReview>();
}

