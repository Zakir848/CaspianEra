using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspiEra.Domain.Enum
{
    public enum ReservationStatus
    {
        Pending = 1,
        Confirmed = 2,
        CheckedIn = 3,
        Completed = 4,
        Cancelled = 5,
        Expired = 6
    }
}
