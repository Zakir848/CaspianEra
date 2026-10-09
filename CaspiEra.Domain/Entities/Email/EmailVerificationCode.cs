

using CaspianEra.Domain.Entities.Users;
using CaspiEra.Domain.Common;

namespace CaspianEra.Domain.Entities.Email;

public class EmailVerificationCode : BaseEntity
{

    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;

    public string CodeHash { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }

    public DateTime? UsedAt { get; set; }

    public int FailedAttempts { get; set; }
}
