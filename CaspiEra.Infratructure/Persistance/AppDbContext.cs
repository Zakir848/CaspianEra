using CaspiEra.Domain.Entities;
using CaspiEra.Domain.Entities.Amenities;
using CaspiEra.Domain.Entities.ApplicationUsers;
using CaspiEra.Domain.Entities.Hotels;
using CaspiEra.Domain.Entities.Images;
using CaspiEra.Domain.Entities.Locations;
using CaspiEra.Domain.Entities.Refunds;
using CaspiEra.Domain.Entities.Reservations;
using CaspiEra.Domain.Entities.Reviews;
using CaspiEra.Domain.Entities.Rooms;
using CaspiEra.Domain.Entities.Token;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CaspianEra.Infratructure.Persistance;

public class AppDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<City> Cities => Set<City>();
    public DbSet<CityImage> CityImages => Set<CityImage>();

    public DbSet<Hotel> Hotels => Set<Hotel>();
    public DbSet<HotelImage> HotelImages => Set<HotelImage>();
    public DbSet<HotelAmenity> HotelAmenities => Set<HotelAmenity>();
    public DbSet<HotelReview> Reviews => Set<HotelReview>();

    public DbSet<Room> Rooms => Set<Room>();
    public DbSet<RoomType> RoomTypes => Set<RoomType>();
    public DbSet<RoomAmenity> RoomAmenities => Set<RoomAmenity>();
    public DbSet<RoomImage> RoomImages => Set<RoomImage>();
    public DbSet<RoomReview> RoomReviews => Set<RoomReview>();
    public DbSet<RoomHourlyPackage> RoomHourlyPackages => Set<RoomHourlyPackage>();
    public DbSet<LongStayDiscount> LongStayDiscounts => Set<LongStayDiscount>();

    public DbSet<Reservation> Reservations => Set<Reservation>();
    public DbSet<ReservationItem> ReservationItems => Set<ReservationItem>();


    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<Refund> Refunds => Set<Refund>();


    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfigurationsFromAssembly(
            typeof(AppDbContext).Assembly
        );
    }

}
