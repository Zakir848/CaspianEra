using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.DTOs.Hotels;

public class HotelImageDto
{
    public IFormFile? ImageUrl { get; set; }
    public bool IsMain { get; set; }
}

