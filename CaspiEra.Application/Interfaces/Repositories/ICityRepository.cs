using CaspianEra.Application.Models;
using CaspiEra.Domain.Entities.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Interfaces.Repositories;

public interface ICityRepository
{
    Task<PagedResult<City>> GetAllAsync(int page, int pageSize, CancellationToken cancellationToken);
    Task<City> GetByIdAsync(Guid id,CancellationToken cancellationToken);
    Task<City> CreateCityAsync(City city,CancellationToken cancellationToken);
    void Update(City city);
    void Delete(City city);
    Task SaveChangeAsync(CancellationToken cancellationToken);
}
