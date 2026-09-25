using CaspiEra.Domain.Entities.Reviews;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Infratructure.Persistance.Configurations
{
    public class RoomReviewConfiguration : IEntityTypeConfiguration<RoomReview>
    {
        public void Configure(EntityTypeBuilder<RoomReview> builder)
        {
            builder.HasOne(r => r.Room)
                .WithMany(room => room.RoomReviews)
                .HasForeignKey(r => r.RoomId)
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
}
