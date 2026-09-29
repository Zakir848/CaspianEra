using AutoMapper;
using CaspianEra.Application.DTOs.Hotels;
using CaspiEra.Domain.Entities.Hotels;

namespace CaspianEra.Application.Mappings;

public class HotelMappingProfile : Profile
{
    public HotelMappingProfile()
    {
        CreateMap<CreateHotelDto, Hotel>().ForMember(
                dest => dest.HotelImages,
                opt => opt.Ignore()); ;

        CreateMap<Hotel, HotelDto>();

        CreateMap<Hotel, HotelDetailDto>();
    }
}
