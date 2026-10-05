using CaspianEra.Application.DTOs.Hotels;
using CaspianEra.Application.DTOs.Rooms;
using CaspianEra.Application.Features.Hotels.Command.CreateHotel;
using CaspianEra.Application.Features.Hotels.Query.GetHotelById;
using CaspianEra.Application.Features.Hotels.Query.GetHotels;
using CaspianEra.Application.Features.Rooms.Command.CreateRoom;
using CaspianEra.Application.Features.Rooms.Query.GetRoomById;
using CaspianEra.Application.Features.Rooms.Query.GetRooms;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CaspiEra.UI.Controllers
{
    [ApiController]
    [Route("api/hotels/{hotelId:guid}/rooms")]
    public class RoomController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(int page, int pageSize, Guid hotelId, CancellationToken cancellationToken)
        {
            var rooms = await _mediator.Send(new GetRoomsQuery(page, pageSize,hotelId), cancellationToken);

            return Ok(rooms);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult> GetById(Guid hotelId,Guid id, CancellationToken cancellationToken)
        {
            var room = await _mediator.Send(new GetRoomByIdQuery(hotelId,id), cancellationToken);

            if (room is null)
            {
                return NotFound("Room not found");
            }

            return Ok(room);
        }

        [HttpPost]
        [Authorize(Roles ="AppAdmin,HotelOwner")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create(CreateRoomDto dto, CancellationToken cancellationToken)
        {
            var hotel = await _mediator.Send(new CreateRoomCommand(dto), cancellationToken);

            return Ok(hotel);
        }
    }
}
