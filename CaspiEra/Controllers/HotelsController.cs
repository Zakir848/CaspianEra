using CaspianEra.Application.DTOs.Hotels;
using CaspianEra.Application.Features.Cities.Command.CreateCity;
using CaspianEra.Application.Features.Hotels.Command.CreateHotel;
using CaspianEra.Application.Features.Hotels.Query.GetHotelById;
using CaspianEra.Application.Features.Hotels.Query.GetHotels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CaspiEra.UI.Controllers
{
    [ApiController]
    [Route("api/Cities/{cityId:guid}/Hotels")]
    public class HotelsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllByCityId(int page, int pageSize, [FromRoute] Guid cityId, CancellationToken cancellationToken)
        {
            var hotels = await _mediator.Send(new GetHotelsByCityIdQuery(cityId, page, pageSize), cancellationToken);

            return Ok(hotels);
        }


        [HttpGet]
        [Route("/api/Hotels")]
        public async Task<ActionResult> GetAll(int page, int pageSize, CancellationToken cancellationToken)
        {
            var hotels = await _mediator.Send(new GetHotelsQuery(page, pageSize), cancellationToken);

            return Ok(hotels);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            var hotel = await _mediator.Send(new GetHotelByIdQuery(id), cancellationToken);

            if (hotel is null)
            {
                return NotFound("Hotel not found");
            }

            return Ok(hotel);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        //[Authorize(Roles = "AppAdmin,HotelOwner")]
        public async Task<IActionResult> Create([FromRoute] Guid cityId, [FromForm] CreateHotelDto dto, CancellationToken cancellationToken)
        {
            var hotel = await _mediator.Send(new CreateHotelCommand(cityId, dto), cancellationToken);

            return Ok(hotel);
        }

    }
}
