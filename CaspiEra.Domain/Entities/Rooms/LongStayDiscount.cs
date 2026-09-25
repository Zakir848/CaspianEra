using CaspiEra.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Rooms
{
    public class LongStayDiscount : BaseEntity
    {
        public Guid RoomId { get; set; }
        public Room Room { get; set; } = null!;

        public int MinimumNights { get; set; }

        public decimal DiscountPercent { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
