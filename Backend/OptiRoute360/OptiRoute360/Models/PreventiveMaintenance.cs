using OptiRoute360.Data.Entities;

public class PreventiveMaintenance : BaseEntity
{
    public Guid VehicleId { get; set; }
    public Guid MaintenanceTypeId { get; set; }
    public string IntervalType { get; set; }
    public int IntervalValue { get; set; }
    public DateTime LastPerformed { get; set; }
    public DateTime NextDue { get; set; }
    public string Status { get; set; }
    public string Notes { get; set; }

    // Navigation properties
    public Vehicle Vehicle { get; set; }
    public MaintenanceType MaintenanceType { get; set; }
    public Guid HubId { get; set; }  
    public Hub Hub { get; set; }
  
}