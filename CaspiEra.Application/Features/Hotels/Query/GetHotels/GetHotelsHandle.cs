using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Hotels;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Hotels.Query.GetHotels;

public class GetHotelsHandle : IRequestHandler<GetHotelsQuery, List<Hotel>>
{
    private readonly IHotelRepository _repository;

    public GetHotelsHandle(IHotelRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Hotel>> Handle(GetHotelsQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetAllAsync(cancellationToken);
    }
}
