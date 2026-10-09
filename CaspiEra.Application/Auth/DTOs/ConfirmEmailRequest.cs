using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaspianEra.Application.Auth.DTOs;

public class ConfirmEmailRequest
{
    public Guid UserId { get; set; }

    public string Token { get; set; } = null!;
}
