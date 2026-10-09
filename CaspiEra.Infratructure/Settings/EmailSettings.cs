using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Infratructure.Settings;

public class EmailSettings
{
    public string Host { get; set; } = null!;
    public int Port { get; set; }

    public string UserName { get; set; } = null!;
    public string Password { get; set; } = null!;

    public string FromEmail { get; set; } = null!;
    public string FromName { get; set; } = null!;
}
