using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.DTOs.Hotels;

public class CreateHotelDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public int FloorCount { get; set; }
    public int? StarCount { get; set; }

    public Guid CityId { get; set; }
    public Guid OwnerId { get; set; }
    public List<IFormFile> Images { get; set; } = new();
}
