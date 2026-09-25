using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.DTOs.Hotels
{
    public class CreateHotelDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;

        public string Number { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public int CityId { get; set; }
        public string CityName { get; set; } = string.Empty;
    }
}
