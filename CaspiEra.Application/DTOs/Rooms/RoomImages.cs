using Microsoft.AspNetCore.Http;

namespace CaspianEra.Application.DTOs.Rooms
{
    public class RoomImages
    {
        public IFormFile? ImageUrl { get; set; }
        public bool IsMain { get; set; }
    }
}
