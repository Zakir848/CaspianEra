using Microsoft.AspNetCore.Http;

namespace CaspianEra.Application.DTOs.Rooms;

public class RoomImagesDto
{
    public IFormFile? ImageUrl { get; set; }
    public bool IsMain { get; set; }
}
