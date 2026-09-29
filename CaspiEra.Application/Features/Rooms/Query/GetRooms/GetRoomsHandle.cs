using AutoMapper;
using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Rooms;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Rooms.Query.GetRooms;

public class GetRoomsHandle : IRequestHandler<GetRoomsQuery,List<Room>>
{
    private readonly IRoomRepository _repository;

    public GetRoomsHandle(IRoomRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Room>> Handle(GetRoomsQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetRoomsAsync(request.hotelId, cancellationToken);
    }
}

