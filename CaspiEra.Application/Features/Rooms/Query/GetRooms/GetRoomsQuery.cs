using CaspianEra.Application.Models;
using CaspiEra.Domain.Entities.Rooms;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Rooms.Query.GetRooms;

public record GetRoomsQuery(int page, int pageSize, Guid hotelId) : IRequest<PagedResult<Room>>;
