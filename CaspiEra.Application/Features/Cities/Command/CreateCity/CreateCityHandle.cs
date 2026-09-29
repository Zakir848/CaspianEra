using AutoMapper;
using CaspianEra.Application.DTOs.Cities;
using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Images;
using CaspiEra.Domain.Entities.Locations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Cities.Command.CreateCity;

public class CreateCityHandle : IRequestHandler<CreateCityCommand, CityDto>
{
    private readonly ICityRepository _cityRepository;
    private readonly IMapper _mapper;
    private readonly IFileStorageService _fileStorageService;

    public CreateCityHandle(ICityRepository cityRepository, IMapper mapper, IFileStorageService fileStorageService)
    {
        _cityRepository = cityRepository;
        _mapper = mapper;
        _fileStorageService = fileStorageService;
    }

    public async Task<CityDto> Handle(CreateCityCommand request, CancellationToken cancellationToken)
    {
        var city = _mapper.Map<City>(request.dto);

        if(request.dto.Image is not null)
        {
            foreach (var file in request.dto.Image)
            {
                var imageUrl = await _fileStorageService.SaveImageAsync(file,cancellationToken);

                city.CityImages.Add(new CityImage
                {
                    ImageUrl = imageUrl
                });
            }
        }

        await _cityRepository.CreateCityAsync(city,cancellationToken);

        await _cityRepository.SaveChangeAsync(cancellationToken);

        return _mapper.Map<CityDto>(city);
    }
}
