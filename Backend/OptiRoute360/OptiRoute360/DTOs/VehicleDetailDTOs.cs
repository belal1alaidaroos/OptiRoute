// 25. VehicleDetail DTOs
using System.ComponentModel.DataAnnotations;

public class VehicleDetailDto {
    public Guid VehicleId { get; set; }
    public string VehiclePlate { get; set; }
    public string Engine { get; set; }
    public string Transmission { get; set; }
    public decimal FuelCapacity { get; set; }
    public decimal Weight { get; set; }
}

public class UpdateVehicleSpecsDto {
    public string Engine { get; set; }
    public string Transmission { get; set; }
    [Range(0, 1000)] public decimal FuelCapacity { get; set; }
    [Range(0, 100000)] public decimal Weight { get; set; }
}