// 26. VehiclesMake DTOs
using System.ComponentModel.DataAnnotations;

public class VehicleMakeDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Country { get; set; }
    public bool Popular { get; set; }
}

public class CreateVehicleMakeDto {
    [Required][StringLength(100)] public string Name { get; set; }
    [Required] public string Country { get; set; }
}