// 15. Maintenance DTOs
using System.ComponentModel.DataAnnotations;

public class MaintenanceDto {
    public Guid Id { get; set; }
    public Guid VehicleId { get; set; }
    public string VehiclePlate { get; set; }
    public Guid MaintenanceTypeId { get; set; }
    public string MaintenanceTypeName { get; set; }
    public string Description { get; set; }
    public string Priority { get; set; }
    public string Status { get; set; }
    public DateTime ScheduledDate { get; set; }
    public Guid WorkshopId { get; set; }
    public string WorkshopName { get; set; }
    public decimal EstimatedCost { get; set; }
    public decimal ActualCost { get; set; }
    public DateTime CompletionDate { get; set; }

    

}

public class CompleteMaintenanceDto {
    [Required][Range(0, 100000)] public decimal ActualCost { get; set; }
    public string Notes { get; set; }
}