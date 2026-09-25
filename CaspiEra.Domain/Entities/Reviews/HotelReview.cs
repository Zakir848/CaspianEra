
using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.ApplicationUsers;
using CaspiEra.Domain.Entities.Hotels;
using CaspiEra.Domain.Entities.Reservations;
namespace CaspiEra.Domain.Entities;

public class HotelReview : BaseEntity
{
    public Guid HotelId { get; set; }
    public Hotel Hotel { get; set; } = null!;

    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;

    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;

    public Guid ReservationId { get; set; }
    public Reservation Reservation { get; set; } = null!;
}

