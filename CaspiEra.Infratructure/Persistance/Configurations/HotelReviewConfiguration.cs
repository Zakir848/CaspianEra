using CaspiEra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CaspianEra.Infratructure.Persistance.Configurations;

public class HotelReviewConfiguration
    : IEntityTypeConfiguration<HotelReview>
{
    public void Configure(EntityTypeBuilder<HotelReview> builder)
    {
        builder.HasOne(r => r.Hotel)
            .WithMany(h => h.HotelReviews)
            .HasForeignKey(r => r.HotelId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(r => r.User)
            .WithMany()
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(r => r.Reservation)
            .WithMany()
            .HasForeignKey(r => r.ReservationId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}

