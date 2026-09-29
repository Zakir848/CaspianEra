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
            //.ForMember(
            //      dest => dest.CityImages,
            //      opt => opt.MapFrom(src =>
            //src.Image.Select(x => x.Image)));
        //        .ForMember(
        //             dest => dest.CityId,
        //             opt => opt.MapFrom(src => src.Id))
        //         .ForMember(
        //             dest => dest.CityName,
        //             opt => opt.MapFrom(src => src.Name))


        CreateMap<City, CityDto>();
    }
}
