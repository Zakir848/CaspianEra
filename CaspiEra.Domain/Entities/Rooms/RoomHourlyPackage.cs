using CaspiEra.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Rooms
{
    public class RoomHourlyPackage : BaseEntity
    {
        public Guid RoomId { get; set; }
        public Room Room { get; set; } = null!;

        public int Hours { get; set; }

        public decimal Price { get; set; }
    }
}
