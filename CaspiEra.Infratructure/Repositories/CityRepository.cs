using CaspianEra.Application.Interfaces.Repositories;
using CaspianEra.Application.Models;
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

    public async Task<PagedResult<City>> GetAllAsync(int page, int pageSize, CancellationToken cancellationToken)
    {
        var query = _context.Cities.AsNoTracking();

        var totalCount = await query.CountAsync(cancellationToken);

        var cities = await _context.Cities
            .AsNoTracking()
            .Include(x => x.Hotels)
            .Include(x=>x.CityImages)
            .OrderBy(x => x.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize) 
            .ToListAsync(cancellationToken);

        return new PagedResult<City>
        {
            Items = cities,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        };
    }

    public async Task<City?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
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
