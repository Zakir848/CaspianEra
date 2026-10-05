using CaspiEra.Domain.Entities.Hotels;
using Microsoft.EntityFrameworkCore;
using CaspianEra.Infratructure.Persistance;
using CaspianEra.Application.Interfaces.Repositories;

namespace CaspiEra.Infratructure.Repositories
{
    public class HotelRepository : IHotelRepository
    {
        private readonly AppDbContext _context;

        public HotelRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Hotel>> GetAllAsync(Guid cityId, int page, int pageSize, CancellationToken cancellationToken)
        {
            return await _context.Hotels
                .AsNoTracking()
                .Where(x=>x.CityId == cityId)
                .Include(x => x.City)                
                .Include(x => x.HotelImages)
                .OrderBy(x=> x.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);
        }

        public async Task<Hotel?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Hotels
                .AsNoTracking()                
                .Include(x => x.Owner)
                .Include(x => x.Rooms)
                .Include(x => x.RoomTypes)
                .Include(x => x.HotelImages)
                .Include(x => x.HotelReviews)
                .FirstOrDefaultAsync(i => i.Id == id,cancellationToken);
        }

        public async Task<Hotel> CreateAsync(Hotel hotel, CancellationToken cancellationToken)
        {
            await _context.Hotels.AddAsync(hotel, cancellationToken);

            return hotel;
        }

        public void Delete(Hotel hotel)
        {
            _context.Hotels.Remove(hotel);
        }

        public void Update(Hotel hotel)
        {
            _context.Hotels.Update(hotel);
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }

        public Task<int> GetCountAsync(CancellationToken cancellationToken)
        {
            return _context.Hotels.CountAsync(cancellationToken);
        }
    }
}
