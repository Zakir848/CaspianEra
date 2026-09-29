using CaspiEra.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Amenities
{
    public class RoomAmenity : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
    }
}
