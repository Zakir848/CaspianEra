using CaspiEra.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Entities.Rooms;

public class RoomType : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public decimal BasePrice { get; set; }
    public ICollection<Room> RoomTypes { get; set; } 
        = new List<Room>();
}
