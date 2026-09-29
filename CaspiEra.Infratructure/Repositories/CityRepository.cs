using CaspianEra.Application.Interfaces.Repositories;
using CaspianEra.Infratructure.Persistance;
using CaspiEra.Domain.Entities.Locations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Infratructure.Repositories;

public class CityRepository : ICityRepository
{
    private readonly AppDbContext _context;

    public CityRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<City>> GetAllCityAsync(CancellationToken cancellationToken)
    {
        return await _context.Cities
            .AsNoTracking()
            .Include(x => x.Hotels)
            .Include(x=>x.CityImages)
            .ToListAsync(cancellationToken);
    }

    public async Task<City?> GetCityByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Cities
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id); ;
    }

    public async Task<City> CreateCityAsync(City city, CancellationToken cancellationToken)
    {
        await _context.Cities.AddAsync(city, cancellationToken);

        return city;
    }

    public void Delete(City city)
    {
        _context.Cities.Remove(city);
    }

    public async Task SaveChangeAsync(CancellationToken cancellationToken)
    {
        await _context.SaveChangesAsync(cancellationToken);
    }

    public void Update(City city)
    {
        _context.Cities.Update(city);
    }
}
