using CaspianEra.Application.DTOs.Hotels;
using CaspianEra.Application.Interfaces.Repositories;
using CaspianEra.Application.Models;
using CaspiEra.Domain.Entities.Hotels;
using MediatR;

namespace CaspianEra.Application.Features.Hotels.Query.GetHotels;

public class GetHotelsByCityIdHandle : IRequestHandler<GetHotelsByCityIdQuery, PagedResult<HotelDto>>
{
    private readonly IHotelRepository _repository;

    public GetHotelsByCityIdHandle(IHotelRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResult<HotelDto>> Handle(GetHotelsByCityIdQuery request, CancellationToken cancellationToken)
    {
        var hotels = await _repository.GetAllByCityIdAsync(request.cityId, request.page, request.pageSize, cancellationToken);

        var totalCount = await _repository.GetCountByCityIdAsync(request.cityId, cancellationToken);

        return new PagedResult<HotelDto>
        {
            Items = hotels.Select(h => new HotelDto
            {
                Location = h.City?.Name,
                HotelName = h.Name,
                Rating = h.Rating
            }).ToList(),
            Page = request.page,
            PageSize = request.pageSize,
            TotalCount = totalCount,
            TotalPages = (int)Math.Ceiling((double)totalCount / request.pageSize)
        };

    }
}
