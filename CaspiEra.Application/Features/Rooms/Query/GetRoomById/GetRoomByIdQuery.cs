using CaspiEra.Domain.Entities.Rooms;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Rooms.Query.GetRoomById;

public record GetRoomByIdQuery(Guid hotelId,Guid id) : IRequest<Room?>;
