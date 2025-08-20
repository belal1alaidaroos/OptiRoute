// 44. Vehicles DTOs
using System.ComponentModel.DataAnnotations;

public class VehicleDto {

    public Guid Id { get; set; }
    public string PlateNumber { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public string Status { get; set; }
    public string HubName { get; set; }
    public string DriverName { get; set; }
    public DateTime LastMaintenanceDate { get; set; }
}

public class BulkAssignDriverDto {
    [Required] public Guid DriverId { get; set; }
    [Required] public List<Guid> VehicleIds { get; set; }
}

public class UpdateMaintenanceStatusDto {
    [Required] public DateTime LastMaintenanceDate { get; set; }
    [Required] public DateTime NextMaintenanceDate { get; set; }
    [Required] public string Status { get; set; }
}

public class CreateVehicleDto {
    [Required] public string PlateNumber { get; set; }
    public string PlateChar { get; set; }
    [Required] public Guid MakeId { get; set; }
    [Required] public Guid ModelId { get; set; }
    public int Year { get; set; }
    public string Type { get; set; }
    public int Capacity { get; set; }
    public string FuelType { get; set; }
    public string Status { get; set; }
    [Required] public Guid HubId { get; set; }
    public Guid? DriverId { get; set; }
}

public class UpdateVehicleDto {
    public string PlateNumber { get; set; }
    public string PlateChar { get; set; }
    public Guid? MakeId { get; set; }
    public Guid? ModelId { get; set; }
    public int? Year { get; set; }
    public string Type { get; set; }
    public int? Capacity { get; set; }
    public string FuelType { get; set; }
    public string Status { get; set; }
    public Guid? HubId { get; set; }
    public Guid? DriverId { get; set; }
}