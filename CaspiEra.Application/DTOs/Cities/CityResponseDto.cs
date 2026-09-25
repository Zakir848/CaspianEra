using Microsoft.AspNetCore.Http;

namespace CaspianEra.Application.DTOs.Cities;

public class CityResponseDto
{
    public Guid CityId { get; set; }
    public string CityName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
}

