using AutoMapper;
using CaspianEra.Application.DTOs.Rooms;
using CaspiEra.Domain.Entities.Rooms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Mappings;

public class RoomMappingProfile : Profile
{
    public RoomMappingProfile()
    {
        CreateMap<CreateRoomDto, Room>()
            .ForMember(
            dest => dest.RoomImages,
            opt=> opt.Ignore());

        CreateMap<Room, RoomDto>();

        CreateMap<Room, RoomDetailDto>();
    }
}
