using CaspianEra.Application.DTOs.Owners;
using CaspianEra.Application.Interfaces.Services;
using CaspianEra.Application.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Owners.Query.GetOwners;

public class GetOwnersHandle : IRequestHandler<GetOwnersQuery, PagedResult<OwnerListDto>>
{
    private readonly IUserService _userService;

    public GetOwnersHandle(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<PagedResult<OwnerListDto>> Handle(GetOwnersQuery request, CancellationToken cancellationToken)
    {
        return await _userService.GetOwnersAsync(request.Page, request.PageSize, cancellationToken);
    }
}
