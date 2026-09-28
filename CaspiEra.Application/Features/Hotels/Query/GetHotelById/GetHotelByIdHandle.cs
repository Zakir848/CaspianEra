using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Hotels;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Hotels.Query.GetHotelById;

public class GetHotelByIdHandle : IRequestHandler<GetHotelByIdQuery, Hotel?>
{
    private readonly IHotelRepository _repository;

    public GetHotelByIdHandle(IHotelRepository repository)
    {
        _repository = repository;
    }

    public async Task<Hotel?> Handle(GetHotelByIdQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetByIdAsync(request.id, cancellationToken);
    }
}
