// 19. PreventiveMaintenance DTOs
using System.ComponentModel.DataAnnotations;

public class PreventiveMaintenanceDto {
    public Guid Id { get; set; }
    public Guid VehicleId { get; set; }
    public string VehiclePlate { get; set; }
    public Guid MaintenanceTypeId { get; set; }
    public string MaintenanceTypeName { get; set; }
    public string IntervalType { get; set; }
    public int IntervalValue { get; set; }
    public DateTime LastPerformed { get; set; }
    public DateTime NextDue { get; set; }
    public string Status { get; set; }
}

public class CreatePreventiveMaintenanceDto {
    [Required] public Guid VehicleId { get; set; }
    [Required] public Guid MaintenanceTypeId { get; set; }
    [Required] public string IntervalType { get; set; }
    [Required][Range(1, 365)] public int IntervalValue { get; set; }
}