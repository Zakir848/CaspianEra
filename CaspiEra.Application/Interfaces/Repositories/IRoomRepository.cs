using CaspiEra.Domain.Entities.Rooms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Interfaces.Repositories;

public interface IRoomRepository
{
    Task<List<Room>> GetRoomsAsync(Guid hotelId, CancellationToken cancellationToken);
    Task<Room> GetRoomByIdAsync(Guid HotelId, Guid id, CancellationToken cancellationToken);
    Task<Room> CreateRoomAsync(Room room, CancellationToken cancellationToken);
    void Update(Room room);
    void Delete(Room room);

    Task SaveChangesAsync(CancellationToken cancellationToken);
}
