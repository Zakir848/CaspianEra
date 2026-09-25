using CaspianEra.Application.DTOs.Hotels;
using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Hotels;
using MediatR;

namespace CaspianEra.Application.Features.Hotels.Command.CreateHotel;

public class CreateHotelHandle : IRequestHandler<CreateHotelCommand, HotelDto>
{
    private readonly IHotelRepository _repository;

    public CreateHotelHandle(IHotelRepository repository)
    {
        _repository = repository;
    }

    public async Task<HotelDto> Handle(CreateHotelCommand request, CancellationToken cancellationToken)
    {
        var hotel = new Hotel
        {            
            CityId = request.dto.CityId,
            Name = request.dto.Name,
            Address = request.dto.Address,
            Description = request.dto.Description,
            Email = request.dto.Email,
            PhoneNumber = request.dto.Number,
        };

        await _repository.CreatAsync(hotel,cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        var hotelFromDb = await _repository.GetByIdAsync(hotel.No,cancellationToken);

        return new HotelDto
        {
            Name = hotelFromDb.Name,
            Rating = hotelFromDb.Rating           
        };

    }
}
