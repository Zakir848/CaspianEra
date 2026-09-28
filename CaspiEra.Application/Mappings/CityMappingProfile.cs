using AutoMapper;
using CaspianEra.Application.DTOs.Cities;
using CaspiEra.Domain.Entities.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Mappings;

public class CityMappingProfile : Profile
{
    public CityMappingProfile()
    {
        CreateMap<CreateCityDto, City>();

        CreateMap<City, CreateCityDto>();
    }
}
