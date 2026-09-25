using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Hotels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Amenities
{
    public class HotelAmenity 
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public Guid HotelId { get; set; }
        public Hotel Hotel { get; set; } = null!;
    }
}
