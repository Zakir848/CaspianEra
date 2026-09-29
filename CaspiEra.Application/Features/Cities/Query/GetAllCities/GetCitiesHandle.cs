using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Locations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Cities.Query.GetAllCities;

public class GetCitiesHandle : IRequestHandler<GetCitiesQuery, List<City>>
{
    private readonly ICityRepository _repository;

    public GetCitiesHandle(ICityRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<City>> Handle(GetCitiesQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetAllCityAsync(cancellationToken);
    }
}
