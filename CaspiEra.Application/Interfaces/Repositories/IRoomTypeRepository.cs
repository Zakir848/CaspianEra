using CaspiEra.Domain.Entities.Rooms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Interfaces.Repositories;

public interface IRoomTypeRepository
{
    Task<List<RoomType>> GetRoomTypesAsync(CancellationToken cancellationToken);
    Task<RoomType> GetRoomTypesByIdAsync(Guid id,CancellationToken cancellationToken);
    Task<RoomType> CreateRoomTypeAsync(RoomType roomType, CancellationToken cancellationToken);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}
