using CaspianEra.Application.DTOs.Cities;
using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Locations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Cities.Command.CreateCity;

public class CreateCityHandle : IRequestHandler<CreateCityCommand, CityResponseDto>
{
    private readonly ICityRepository _cityRepository;

    public CreateCityHandle(ICityRepository cityRepository)
    {
        _cityRepository = cityRepository;
    }

    public async Task<CityResponseDto> Handle(CreateCityCommand request, CancellationToken cancellationToken)
    {
        var city = new City
        {
            Description = request.dto.Description!,
            Name = request.dto.Name!,
        };

        await _cityRepository.CreateCityAsync(city,cancellationToken);

        await _cityRepository.SaveChangeAsync(cancellationToken);

        var cityFromDb = await _cityRepository.GetCityByIdAsync(city.Id,cancellationToken);

        return new CityResponseDto
        {
            CityId = cityFromDb.Id,
            CityName = cityFromDb.Name,
            Description = cityFromDb.Description
        };
    }
}
