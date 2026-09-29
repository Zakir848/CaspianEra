using CaspianEra.Application.Interfaces.Repositories;
using CaspianEra.Infratructure.Persistance;
using CaspiEra.Domain.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace CaspianEra.Infratructure.Repositories;

public class RoomTypeRepository : IRoomTypeRepository
{
    private readonly AppDbContext _context;

    public RoomTypeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<RoomType> CreateRoomTypeAsync(RoomType roomType, CancellationToken cancellationToken)
    {
        await _context.RoomTypes.AddAsync(roomType, cancellationToken);

        return roomType;
    }

    public async Task<List<RoomType>> GetRoomTypesAsync(CancellationToken cancellationToken)
    {
        return await _context.RoomTypes
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<RoomType?> GetRoomTypesByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.RoomTypes
            .AsNoTracking()
            .Include(x=>x.Rooms)
            .FirstOrDefaultAsync(r => r.Id == id,cancellationToken);
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken)
    {
        await _context.SaveChangesAsync(cancellationToken);
    }
}
