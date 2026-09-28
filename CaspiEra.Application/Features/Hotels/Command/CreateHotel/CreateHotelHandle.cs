using CaspianEra.Application.DTOs.Hotels;
using CaspianEra.Application.Interfaces.Repositories;
using CaspiEra.Domain.Entities.Hotels;
using CaspiEra.Domain.Entities.Images;
using MediatR;

namespace CaspianEra.Application.Features.Hotels.Command.CreateHotel;

public class CreateHotelHandle : IRequestHandler<CreateHotelCommand, HotelDto>
{
    private readonly IHotelRepository _repository;
    private readonly IFileStorageService _fileStorageService;

    public CreateHotelHandle(IHotelRepository repository, IFileStorageService fileStorageService)
    {
        _repository = repository;
        _fileStorageService = fileStorageService;
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
            PhoneNumber = request.dto.PhoneNumber,
            StarCount = request.dto.StarCount,
            FloorCount = request.dto.FloorCount,
        };

        if (request.dto.Images is not null)
        {
            foreach (var file in request.dto.Images)
            {
                var ImageUrl = await _fileStorageService
                    .SaveImageAsync(file);

                hotel.HotelImages.Add(new HotelImage
                {
                    ImageUrl = ImageUrl
                });
            }
        }

        await _repository.CreatAsync(hotel, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);


        return new HotelDto
        {
            Id = hotel.Id,
            Name = hotel.Name,
            Rating = hotel.Rating
        };

    }
}
