using CaspianEra.Application.Interfaces.Repositories;
using CaspianEra.Infratructure.Persistance;
using CaspiEra.Domain.Entities.Images;
using Microsoft.EntityFrameworkCore;

namespace CaspiEra.Infratructure.Repositories
{
    public class HotelImageRepository : IHotelImageRepository
    {
        private readonly AppDbContext _context;

        public HotelImageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<HotelImage>> GetHotelImages(Guid hotelId, CancellationToken cancellationToken)
        {
            return await _context.HotelImages
                 .AsNoTracking()
                 .Where(h => h.HotelId == hotelId)
                 .ToListAsync(cancellationToken);
        }
    }
}
