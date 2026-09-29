using AutoMapper;
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
    private readonly IMapper _mapper;

    public CreateHotelHandle(IHotelRepository repository, IFileStorageService fileStorageService, IMapper mapper)
    {
        _repository = repository;
        _fileStorageService = fileStorageService;
        _mapper = mapper;
    }

    public async Task<HotelDto> Handle(CreateHotelCommand request, CancellationToken cancellationToken)
    {
        var hotel = _mapper.Map<Hotel>(request.dto);

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


        return _mapper.Map<HotelDto>(hotel);

    }
}
