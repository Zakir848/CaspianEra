using CaspianEra.Application.DTOs.Rooms;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Rooms.Command.CreateRoom;

public record CreateRoomCommand( CreateRoomDto dto) : IRequest<RoomDto>;
