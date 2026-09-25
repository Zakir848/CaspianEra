using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.ApplicationUsers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Token;

public class RefreshToken : BaseEntity
{
    public string Token { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }

    public bool IsRevoked { get; set; }

    public DateTime? RevokedAt { get; set; }

    public Guid UserId { get; set; }

    public ApplicationUser User { get; set; } = null!;
}

