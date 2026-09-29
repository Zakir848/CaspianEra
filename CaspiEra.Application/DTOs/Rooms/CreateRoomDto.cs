using CaspiEra.Domain.Entities.Rooms;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.DTOs.Rooms;

public class CreateRoomDto
{
    public string? Number { get; set; }
    public int Floor { get; set; }

    public Guid HotelId { get; set; }

    public Guid RoomTypeId { get; set; }

    public List<IFormFile> Images { get; set; } = new();
}
