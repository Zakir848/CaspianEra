using CaspianEra.Application.DTOs.Cities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Cities.Command.CreateCity;

public record CreateCityCommand(CreateCityDto dto) : IRequest<CityListDto>;
