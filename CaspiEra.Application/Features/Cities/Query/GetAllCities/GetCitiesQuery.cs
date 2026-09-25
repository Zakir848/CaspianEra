using CaspiEra.Domain.Entities.Locations;
using MediatR;

namespace CaspianEra.Application.Features.Cities.Query.GetAllCities;

public record GetCitiesQuery : IRequest<List<City>>;