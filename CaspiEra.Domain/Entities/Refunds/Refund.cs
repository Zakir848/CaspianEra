using CaspianEra.Domain.Entities.Users;
using CaspiEra.Domain.Common;
using CaspiEra.Domain.Enum;

namespace CaspiEra.Domain.Entities.Refunds;

public class Refund : BaseEntity
{
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;

    public Guid PaymentId { get; set; }
    public Payment Payment { get; set; } = null!;

    public decimal Amount { get; set; }
    public string Currency { get; set; } = "AZN";

    public RefundStatus Status { get; set; }
        = RefundStatus.Pending;

    public string Reason { get; set; } = string.Empty;

    public string? ProviderRefundId { get; set; }

    public DateTime? CompletedAt { get; set; }

    public string? FailureReason { get; set; }
}
