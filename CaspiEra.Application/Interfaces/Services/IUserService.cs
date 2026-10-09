using CaspianEra.Application.DTOs.Owners;
using CaspianEra.Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Interfaces.Services;

public interface IUserService
{
    Task<Guid> CreateOwnerAsync(
        CreateOwnerDto dto,
        CancellationToken cancellationToken);

    Task<PagedResult<OwnerListDto>> GetOwnersAsync(int page, int pageSize, CancellationToken cancellationToken);
}
