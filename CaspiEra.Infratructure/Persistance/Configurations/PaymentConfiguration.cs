using CaspiEra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Infratructure.Persistance.Configurations;

public class PaymentConfiguration
    : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> builder)
    {
        builder.Property(p => p.Amount)
            .HasPrecision(18, 2);

        builder.Property(p => p.RefundedAmount)
            .HasPrecision(18, 2);

        builder.Property(p => p.Currency)
            .HasMaxLength(3)
            .IsRequired();

        builder.HasOne(p => p.User)
            .WithMany()
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(p => p.Reservation)
            .WithMany()
            .HasForeignKey(p => p.ReservationId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
