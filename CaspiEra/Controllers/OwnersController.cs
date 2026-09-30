using CaspianEra.Application.DTOs.Cities;
using CaspianEra.Application.DTOs.Owners;
using CaspianEra.Application.Features.Owners.Command.CreateOwner;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CaspianEra.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "AppAdmin,HotelOwner")]
    public class OwnersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OwnersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateOwnerDto dto, CancellationToken cancellationToken)
        {
            var ownerId = await _mediator.Send(new CreateOwnerCommand(dto), cancellationToken);

            return StatusCode(
                StatusCodes.Status201Created,
                new { Id = ownerId });
        }
    }
}
