namespace CaspianEra.Application.DTOs.Hotels;

public class HotelQueryDto
{
    public string? SearchCity { get; set; }
    public DateTime Check_In { get; set; }
    public DateTime Check_Out { get; set; }
    public int QuestsCount { get; set; }
}
