using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Amenities;
using CaspiEra.Domain.Entities.Hotels;
using CaspiEra.Domain.Entities.Images;
using CaspiEra.Domain.Entities.Reservations;
using CaspiEra.Domain.Entities.Reviews;

namespace CaspiEra.Domain.Entities.Rooms;

public class Room : BaseEntity
{
    public string RoomNumber { get; set; } = string.Empty;
    public int Floor { get; set; }

    public Guid HotelId { get; set; }
    public Hotel Hotel { get; set; } = null!;

    public Guid RoomTypeId { get; set; }
    public RoomType RoomType { get; set; } = null!;

    public ICollection<RoomImage> RoomImages { get; set; }
        = new List<RoomImage>();
    public ICollection<RoomReview> RoomReviews { get; set; }
        = new List<RoomReview>();

    public ICollection<RoomAmenity> RoomAmenities { get; set; }
        = new List<RoomAmenity>();

    public ICollection<ReservationItem> ReservationItems { get; set; }
        = new List<ReservationItem>();

    public ICollection<RoomHourlyPackage> HourlyPackages { get; set; }
    = new List<RoomHourlyPackage>();

    public ICollection<LongStayDiscount> LongStayDiscounts { get; set; }
        = new List<LongStayDiscount>();
}

