using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Rooms;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Rooms.Query.GetRoomById;

public class GetRoomByIdHandle : IRequestHandler<GetRoomByIdQuery, Room?>
{
    private readonly IRoomRepository _repository;

    public GetRoomByIdHandle(IRoomRepository repository)
    {
        _repository = repository;
    }

    public async Task<Room?> Handle(GetRoomByIdQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetRoomByIdAsync(request.hotelId, request.id, cancellationToken);
    }
}
