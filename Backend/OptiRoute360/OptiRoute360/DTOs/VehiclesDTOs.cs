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