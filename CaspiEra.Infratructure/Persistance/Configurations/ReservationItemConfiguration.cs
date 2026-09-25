using CaspiEra.Domain.Entities.Reservations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Infratructure.Persistance.Configurations
{
    public class ReservationItemConfiguration : IEntityTypeConfiguration<ReservationItem>
    {
        public void Configure(EntityTypeBuilder<ReservationItem> builder)
        {
            builder.HasOne(ri => ri.Reservation)
                .WithMany(r => r.ReservationItems)
                .HasForeignKey(ri => ri.ReservationId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(ri => ri.Room)
                .WithMany(r => r.ReservationItems)
                .HasForeignKey(ri => ri.RoomId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
