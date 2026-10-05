using Microsoft.AspNetCore.Http;

namespace CaspianEra.Application.DTOs.Cities;

public class CityListDto
{
    public Guid CityId { get; set; }
    public int HotelCount { get; set; }
    public string CityName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> ImageUrls { get; set; } = new();
}

