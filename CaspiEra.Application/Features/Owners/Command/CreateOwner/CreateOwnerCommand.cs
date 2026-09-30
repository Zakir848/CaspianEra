using CaspianEra.Application.DTOs.Owners;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Features.Owners.Command.CreateOwner;

public record CreateOwnerCommand(CreateOwnerDto dto) : IRequest<Guid>;
