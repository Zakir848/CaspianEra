using CaspianEra.Domain.Entities.Users;
using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Reservations;
using CaspiEra.Domain.Entities.Rooms;

namespace CaspiEra.Domain.Entities.Reviews;

public class RoomReview : BaseEntity
{
    public Guid RoomId { get; set; }
    public Room Room { get; set; } = null!;

    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;

    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;

    public Guid ReservationId { get; set; }
    public Reservation Reservation { get; set; } = null!;
}

