using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.DTOs.Hotels;

public class HotelDto
{
    public string ImageUrl { get; set; } = null!;
    public string? Location { get; set; }
    public string? HotelName { get; set; }
    public int Rating { get; set; }
}
