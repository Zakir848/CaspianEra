using CaspiEra.Domain.Entities.Hotels;
using CaspiEra.Domain.Entities.Reservations;
using CaspiEra.Domain.Entities.Token;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.ApplicationUsers
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ICollection<Hotel> OwnerHotel { get; set; } 
            = new List<Hotel>();
        public ICollection<Reservation> Reservations { get; set; } 
            = new List<Reservation>();

        public ICollection<RefreshToken> RefreshTokens { get; set; }
            = new List<RefreshToken>();
        
    }
}
