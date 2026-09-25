using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Rooms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Images
{
    public class RoomImage : BaseEntity
    {
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsMain { get; set; }

        public Guid RoomId { get; set; }
        public Room Room { get; set; } = null!;
    }
}
