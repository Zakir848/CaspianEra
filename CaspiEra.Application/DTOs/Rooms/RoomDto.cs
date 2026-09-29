using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.DTOs.Rooms;

public class RoomDto
{
    public string? Number { get; set; }
    public int Floor { get; set; }

    public Guid HotelId { get; set; }
    public string? HotelName { get; set; }

}
