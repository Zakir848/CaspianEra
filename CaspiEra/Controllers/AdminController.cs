using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CaspianEra.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles="AppAdmin")]
    public class AdminController : ControllerBase
    {
        [HttpPost("manager")]
        public async Task CreateManager()
        {

        }
    }
}
