using CaspianEra.Application.DTOs.Owners;
using CaspianEra.Application.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Owners.Query.GetOwners;


public record GetOwnersQuery(int Page, int PageSize) : IRequest<PagedResult<OwnerListDto>>;