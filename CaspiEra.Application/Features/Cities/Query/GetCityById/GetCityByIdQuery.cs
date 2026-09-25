using CaspiEra.Domain.Entities.Locations;
using MediatR;

namespace CaspianEra.Application.Features.Cities.Query.GetCityById;

public record GetCityByIdQuery(Guid id) : IRequest<City?>;
