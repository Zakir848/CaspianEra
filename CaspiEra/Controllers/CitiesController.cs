using CaspianEra.Application.DTOs.Cities;
using CaspianEra.Application.Features.Cities.Command.CreateCity;
using CaspianEra.Application.Features.Cities.Query.GetAllCities;
using CaspianEra.Application.Features.Cities.Query.GetCityById;
using CaspianEra.Infratructure.Persistance;
using CaspiEra.Domain.Entities.Locations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CaspianEra.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(int page, int pageSize, CancellationToken cancellationToken)
        {
            var cities = await _mediator.Send(new GetCitiesQuery(page, pageSize), cancellationToken);

            return Ok(cities);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            var city = await _mediator.Send(new GetCityByIdQuery(id), cancellationToken);

            if (city is null)
            {
                return NotFound("Not found City");
            }

            return Ok(city);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        //[Authorize(Roles ="AppAdmin")]
        public async Task<IActionResult> Create([FromForm] CreateCityDto dto, CancellationToken cancellationToken)
        {
            var city = await _mediator.Send(new CreateCityCommand(dto), cancellationToken);

            return CreatedAtAction(
                nameof(GetById),
                new
                {
                    id = city.CityId
                },
                city
            );
        }

    }
}
