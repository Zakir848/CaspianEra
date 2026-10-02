using CaspianEra.Application.DTOs.Hotels;
using CaspianEra.Application.Interfaces.Repositories;
using CaspianEra.Application.Models;
using CaspiEra.Domain.Entities.Hotels;
using MediatR;

namespace CaspianEra.Application.Features.Hotels.Query.GetHotels;

public class GetHotelsHandle : IRequestHandler<GetHotelsQuery, PagedResult<HotelDto>>
{
    private readonly IHotelRepository _repository;

    public GetHotelsHandle(IHotelRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResult<HotelDto>> Handle(GetHotelsQuery request, CancellationToken cancellationToken)
    {
        var hotels = await _repository.GetAllAsync(request.page, request.pageSize, cancellationToken);

        var totalCount = await _repository.GetCountAsync(cancellationToken);

        return new PagedResult<HotelDto>
        {
            Items = hotels.Select(h => new HotelDto
            {
                Id = h.Id,
                Name = h.Name,
                Description = h.Description,
                Address = h.Address,
                CityName = h.City?.Name!,
                Rating = h.Rating
            }).ToList(),
            Page = request.page,
            PageSize = request.pageSize,
            TotalCount = totalCount,
            TotalPages = (int)Math.Ceiling((double)totalCount / request.pageSize)
        };

    }
}
