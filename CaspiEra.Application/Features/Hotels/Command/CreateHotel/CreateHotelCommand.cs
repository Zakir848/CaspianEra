using CaspianEra.Application.DTOs.Hotels;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Hotels.Command.CreateHotel;

public record CreateHotelCommand(CreateHotelDto dto) : IRequest<HotelDto>;
