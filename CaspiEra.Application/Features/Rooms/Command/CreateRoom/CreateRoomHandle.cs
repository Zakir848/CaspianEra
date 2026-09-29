using AutoMapper;
using CaspianEra.Application.DTOs.Cities;
using CaspianEra.Application.DTOs.Rooms;
using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Images;
using CaspiEra.Domain.Entities.Rooms;
using MediatR;

namespace CaspianEra.Application.Features.Rooms.Command.CreateRoom;

public class CreateRoomHandle : IRequestHandler<CreateRoomCommand, RoomDto?>
{
    private readonly IRoomRepository _repository;
    private readonly IFileStorageService _fileStorageService;
    private readonly IMapper _mapper;

    public CreateRoomHandle(IFileStorageService fileStorageService, IMapper mapper)
    {
        _fileStorageService = fileStorageService;
        _mapper = mapper;
    }

    public async Task<RoomDto?> Handle(CreateRoomCommand request, CancellationToken cancellationToken)
    {
        var room = _mapper.Map<Room>(request.dto);

        if (request.dto.Images is not null)
        {
            foreach (var file in request.dto.Images)
            {
                var imageUrl = await _fileStorageService.SaveImageAsync(file);

                room.RoomImages.Add(new RoomImage
                {
                    ImageUrl = imageUrl
                });
            }
        }

        await _repository.CreateRoomAsync(room, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        return _mapper.Map<RoomDto>(room);
    }
}
