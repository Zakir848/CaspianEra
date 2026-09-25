using CaspiEra.Domain.Entities.Images;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Interfaces.Repositories
{
    public interface IHotelImageRepository 
    {
        Task<List<HotelImage>> GetHotelImages(Guid hotelId, CancellationToken cancellationToken);
    }
}
