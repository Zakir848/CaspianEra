using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Locations;
using MediatR;

namespace CaspianEra.Application.Features.Cities.Query.GetCityById
{
    internal class GetCityByIdHandle : IRequestHandler<GetCityByIdQuery, City?>
    {
        private readonly ICityRepository _repository;

        public GetCityByIdHandle(ICityRepository repository)
        {
            _repository = repository;
        }

        public async Task<City?> Handle(GetCityByIdQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetByIdAsync(request.id, cancellationToken);
        }
    }
}
