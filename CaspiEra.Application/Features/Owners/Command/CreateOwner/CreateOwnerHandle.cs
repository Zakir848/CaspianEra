using CaspianEra.Application.DTOs.Owners;
using CaspianEra.Application.Interfaces.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Owners.Command.CreateOwner;

public class CreateOwnerHandle : IRequestHandler<CreateOwnerCommand, Guid>
{
    private readonly IUserService _userService;

    public CreateOwnerHandle(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<Guid> Handle(CreateOwnerCommand request, CancellationToken cancellationToken)
    {
        return await _userService.CreateOwnerAsync(
            request.dto,
            cancellationToken);
    }
}
