using CaspianEra.Application.Interfaces.Repositories;
using CaspianEra.Infratructure.Persistance;
using CaspiEra.Domain.Entities.Rooms;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Infratructure.Repositories;

public class RoomRepository : IRoomRepository
{
    private readonly AppDbContext _context;

    public RoomRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Room>> GetRoomsAsync(Guid hotelId,CancellationToken cancellationToken)
    {
        return await _context.Rooms
            .AsNoTracking()
            .Where(h=>h.HotelId == hotelId)
            .Include(x=>x.RoomType)
            .Include(x=>x.RoomAmenities)
            .Include(x=>x.RoomImages)
            .Include(x=>x.RoomReviews)
            .AsSplitQuery()
            .ToListAsync(cancellationToken);
    }

    public async Task<Room?> GetRoomByIdAsync(Guid hotelId, Guid id, CancellationToken cancellationToken)
    {
        
        return await _context.Rooms
            .Where(x=>x.HotelId == hotelId && x.Id == id)
            .FirstOrDefaultAsync(x => x.Id == id,cancellationToken);
    }

    public async Task<Room> CreateRoomAsync(Room room, CancellationToken cancellationToken)
    {

        await _context.Rooms.AddAsync(room,cancellationToken);

        return room;
    }

    public void Delete(Room room)
    {
        _context.Rooms.Remove(room);
    }    
    public void Update(Room room)
    {
        _context.Rooms.Update(room);
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken)
    {
        await _context.SaveChangesAsync(cancellationToken);
    }
}
