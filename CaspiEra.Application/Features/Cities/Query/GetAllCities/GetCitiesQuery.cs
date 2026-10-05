using CaspianEra.Application.DTOs.Cities;
using CaspianEra.Application.Models;
using CaspiEra.Domain.Entities.Locations;
using MediatR;

namespace CaspianEra.Application.Features.Cities.Query.GetAllCities;

public record GetCitiesQuery(int page, int pageSize) : IRequest<PagedResult<CityListDto>>;