using CaspianEra.Application.Interfaces.Repositories;
using CaspianEra.Application.Models;
using CaspianEra.Infratructure.Persistance;
using CaspiEra.Domain.Entities.Rooms;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace CaspianEra.Infratructure.Repositories;

public class RoomRepository : IRoomRepository
{
    private readonly AppDbContext _context;

    public RoomRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<Room>> GetRoomsAsync(int page, int pageSize, Guid hotelId, CancellationToken cancellationToken)
    {
        var query = _context.Rooms
            .AsNoTracking()
            .Where(x => x.HotelId == hotelId);

        var totalCount = await query.CountAsync(cancellationToken);

        var rooms = await _context.Rooms
            .AsNoTracking()
            .Where(x => x.HotelId == hotelId)
            .Include(x => x.RoomType)
            .Include(x => x.RoomAmenities)
            .Include(x => x.RoomImages)
            .Include(x => x.RoomReviews)
            .AsSplitQuery()
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return new PagedResult<Room>
        {
            Items = rooms,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
        };
    }

    public async Task<Room?> GetRoomByIdAsync(Guid hotelId, Guid id, CancellationToken cancellationToken)
    {

        return await _context.Rooms
            .Where(x => x.HotelId == hotelId && x.Id == id)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<Room> CreateRoomAsync(Room room, CancellationToken cancellationToken)
    {

        await _context.Rooms.AddAsync(room, cancellationToken);

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
