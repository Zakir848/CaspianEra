using CaspiEra.Domain.Entities.Hotels;

namespace CaspianEra.Application.Interfaces.Repositories;

public interface IHotelRepository
{
    Task<List<Hotel>> GetAllAsync(int page, int pageSize, CancellationToken cancellationToken);
    Task<Hotel> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<Hotel> CreateAsync(Hotel hotel, CancellationToken cancellationToken);
    Task<int> GetCountAsync(CancellationToken cancellationToken);
    void Update(Hotel hotel);
    void Delete(Hotel hotel);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}
