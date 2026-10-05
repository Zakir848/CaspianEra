using CaspianEra.Application.DTOs.Cities;
using CaspianEra.Application.Interfaces.Repositories;
using CaspianEra.Application.Models;
using CaspiEra.Domain.Entities.Locations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Cities.Query.GetAllCities;

public class GetCitiesHandle : IRequestHandler<GetCitiesQuery, PagedResult<CityListDto>>
{
    private readonly ICityRepository _repository;

    public GetCitiesHandle(ICityRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResult<CityListDto>> Handle(GetCitiesQuery request, CancellationToken cancellationToken)
    {
        var cities = await _repository.GetAllAsync(request.page, request.pageSize, cancellationToken);

        var totalCount = await _repository.GetCountAsync(cancellationToken);

        var items = cities.Select(c => new CityListDto
        {
            CityId = c.Id,
            CityName = c.Name,
            Description = c.Description,
            ImageUrls = c.CityImages.Select(ci => ci.ImageUrl).ToList(),
            HotelCount = c.Hotels.Count
        }).ToList();

        return new PagedResult<CityListDto>
        {
            Items = items,
            Page = request.page,
            PageSize = request.pageSize,
            TotalCount = totalCount,
            TotalPages = (int)Math.Ceiling((double)totalCount / request.pageSize)
        };
    }
}
