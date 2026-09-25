using CaspianEra.Domain.Entities.Users;
using CaspianEra.Domain.Enums;
using CaspiEra.Domain.Common;
using CaspiEra.Domain.Entities.Refunds;
using CaspiEra.Domain.Entities.Reservations;
using CaspiEra.Domain.Enum;

namespace CaspiEra.Domain.Entities;

public class Payment : BaseEntity
{
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;

    public Guid ReservationId { get; set; }
    public Reservation Reservation { get; set; } = null!;

    public string Currency { get; set; } = "AZN";
    public decimal Amount { get; set; }

    public PaymentStatus PaymentStatus { get; set; } =
        PaymentStatus.Pending;

    public PaymentMethod Method { get; set; }

    public string? TransactionId { get; set; }

    public string? PaymentProvider { get; set; }

    public DateTime? PaidAt { get; set; }

    public DateTime? RefundedAt { get; set; }

    public decimal RefundedAmount { get; set; }

    public string? FailureReason { get; set; }

    public ICollection<Refund> Refunds { get; set; }
    = new List<Refund>();
}
