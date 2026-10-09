using CaspianEra.API.Helper;
using CaspianEra.Application.Auth.Interface;
using CaspianEra.Application.Features.Hotels.Command.CreateHotel;
using CaspianEra.Application.Interfaces.Repositories;
using CaspianEra.Application.Interfaces.Service;
using CaspianEra.Application.Interfaces.Services;
using CaspianEra.Application.Mappings;
using CaspianEra.Domain.Entities.Users;
using CaspianEra.Infratructure.Authorization;
using CaspianEra.Infratructure.Files;
using CaspianEra.Infratructure.Persistance;
using CaspianEra.Infratructure.Repositories;
using CaspianEra.Infratructure.Services;
using CaspianEra.Infratructure.Settings;
using CaspiEra.Infratructure.Repositories;
using CloudinaryDotNet;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
           .AddJsonOptions(options =>
           {
               options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
           });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    );
});

builder.Services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(
                typeof(CreateHotelCommand).Assembly));

builder.Services.AddAutoMapper(cfg =>
{
    cfg.LicenseKey = builder.Configuration["AutoMapper:LicenseKey"]!;
}, typeof(HotelMappingProfile).Assembly);

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAuthHelper, AuthHelper>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IHotelRepository, HotelRepository>();
builder.Services.AddScoped<ICityRepository, CityRepository>();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<IRoomTypeRepository, RoomTypeRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddSingleton<IOtpService, OtpService>();

builder.Services.AddScoped<IFileStorageService, CloudinaryStorageService>();

//builder.Services.AddScoped<INotificationService, NotificationService>();

builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings")
);

builder.Services.Configure<CloudinarySetting>(
    builder.Configuration.GetSection("CloudinarySettings")
);


builder.Services.AddSingleton<Cloudinary>(sp =>
{
    var settings = builder.Configuration
        .GetSection("CloudinarySettings")
        .Get<CloudinarySetting>();

    var account = new Account(
        settings!.CloudName,
        settings.ApiKey,
        settings.ApiSecret
    );

    return new Cloudinary(account);
});

builder.Services
    .AddIdentityCore<AppUser>(options =>
    {
        // Password
        options.Password.RequiredLength = 6;
        options.Password.RequireDigit = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;

        // User
        options.User.RequireUniqueEmail = true;

        // Lockout
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;
    })
    .AddRoles<IdentityRole<Guid>>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();

// =========================
// JWT Authentication
// =========================

var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT Key is missing.");

var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =
            JwtBearerDefaults.AuthenticationScheme;

        options.DefaultChallengeScheme =
            JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = jwtIssuer,
                ValidAudience = jwtAudience,

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            jwtKey
                        )
                    ),

                ClockSkew =
                    TimeSpan.Zero
            };

        options.Events =
            new JwtBearerEvents
            {
                OnMessageReceived =
                    context =>
                    {
                        var accessToken =
                            context.Request.Query[
                                "access_token"
                            ];

                        var path =
                            context.HttpContext
                                .Request.Path;

                        if (
                            !string.IsNullOrEmpty(
                                accessToken
                            ) &&
                            path.StartsWithSegments(
                                "/hubs"
                            )
                        )
                        {
                            context.Token =
                                accessToken;
                        }

                        return Task.CompletedTask;
                    }
            };
    });

// =========================
// Authorization
// =========================

builder.Services.AddAuthorization();

// =========================
// CORS
// React frontend üçün
// =========================

builder.WebHost.UseUrls("http://0.0.0.0:5000");

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactClient", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "http://10.1.10.13:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    // Get the RoleManager service from dependency injection.
    var roleManager = scope.ServiceProvider
        .GetRequiredService<RoleManager<IdentityRole<Guid>>>();

    // Define the application roles.
    string[] roles =
    {
        "AppAdmin",
        "HotelOwner",
        "Manager",
        "User"
    };

    // Check whether each role already exists.
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            // Create the role if it does not exist.
            var result = await roleManager.CreateAsync(
                new IdentityRole<Guid>(role));

            // Stop application startup if role creation fails.
            if (!result.Succeeded)
            {
                throw new InvalidOperationException(
                    $"Failed to create role: {role}");
            }
        }
    }

    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

    var adminEmail = "AppAdmin@gmail.com";

    var admin = await userManager.FindByEmailAsync(adminEmail);

    if (admin == null)
    {
        admin = new AppUser
        {
            FirstName = "System Admin",
            LastName = "Caspian Era",
            UserName = adminEmail,
            Email = adminEmail,
            EmailConfirmed = true,
            Role = "AppAdmin"
        };

        await userManager.CreateAsync(admin, "Admin_2026");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("ReactClient");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

