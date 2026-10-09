using CaspianEra.Application.DTOs.Hotels;
using CaspianEra.Application.Models;
using MediatR;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Hotels.Query.GetHotels;

public record GetHotelsQuery(int page = 1, int pageSize = 10) : IRequest<PagedResult<HotelDto>>;
