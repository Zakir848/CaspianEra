using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CaspianEra.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "AppAdmin,HotelOwner, Manager")]
    public class HotelManagerController : ControllerBase
    {
    }
}
