using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Hotels;
using CaspiEra.Domain.Entities.Images;

namespace CaspiEra.Domain.Entities.Locations;

public class City : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ICollection<CityImage> CityImages { get; set; } = new List<CityImage>();
    public ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();
}

