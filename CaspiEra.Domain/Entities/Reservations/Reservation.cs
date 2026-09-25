using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Hotels;
using CaspiEra.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Reservations
{
    public class Reservation : BaseEntity
    {
        public string No { get; set; } = string.Empty;

        public int HotelId { get; set; }
        public Hotel Hotel { get; set; } = null!;

        public DateOnly CheckInDate { get; set; }
        public DateOnly CheckOutDate { get; set; }

        public decimal TotalAmount { get; set; }
        public string Currency { get; set; } = "AZN";

        public ReservationStatus Status { get; set; }
            = ReservationStatus.Pending;

        public DateTime? CancelledAt { get; set; }

        public ICollection<ReservationItem> ReservationItems { get; set; }
            = new List<ReservationItem>();
    }
}
