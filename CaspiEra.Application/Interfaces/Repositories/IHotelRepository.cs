using CaspiEra.Domain.Entities.Hotels;

namespace CaspianEra.Application.Interfaces.Repositories;

public interface IHotelRepository
{
    Task<List<Hotel>> GetAllAsync(CancellationToken cancellationToken);
    Task<Hotel> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<Hotel> CreatAsync(Hotel hotel, CancellationToken cancellationToken);
    void Update(Hotel hotel);
    void Delete(Hotel hotel);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}
