using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Rooms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Reservations;

public class ReservationItem : BaseEntity
{

    public Guid ReservationId { get; set; }
    public Reservation Reservation { get; set; } = null!;

    public Guid RoomId { get; set; }
    public Room Room { get; set; } = null!;

    public int GuestCount { get; set; }

    public decimal PricePerNight { get; set; }

}

