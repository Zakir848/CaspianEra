using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Hotels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Images
{
    public class HotelImage : BaseEntity
    {
        public string? ImageUrl { get; set; }

        public Guid HotelId { get; set; }
        public Hotel Hotel { get; set; } = null!;
    }
}
