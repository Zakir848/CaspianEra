using CaspiEra.Domain.Entities.Hotels;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Hotels.Query.GetHotels;

public record GetHotelsQuery : IRequest<List<Hotel>>;
