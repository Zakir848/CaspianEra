using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Hotels;
using CaspiEra.Domain.Entities.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Images;

public class CityImage : BaseEntity
{
    public string ImageUrl { get; set; } = string.Empty;

    public Guid CityId { get; set; }
    public City City { get; set; } = null!;
}



