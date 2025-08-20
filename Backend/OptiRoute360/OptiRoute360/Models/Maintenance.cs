using OptiRoute360.Data.Entities;

public class Maintenance : BaseEntity
{
    public Guid VehicleId { get; set; }
    public Guid MaintenanceTypeId { get; set; }
    public string Description { get; set; }
    public string Priority { get; set; }
    public string Status { get; set; }
    public DateTime ScheduledDate { get; set; }
    public Guid WorkshopId { get; set; }
    public Guid CityId { get; set; }
    public Guid HubId { get; set; }
    public decimal EstimatedCost { get; set; }
    public int EstimatedDuration { get; set; }
    public decimal ActualCost { get; set; }
    public DateTime CompletionDate { get; set; }
    // Navigation properties
    public Vehicle Vehicle { get; set; }
    public MaintenanceType MaintenanceType { get; set; }
    public Workshop Workshop { get; set; }
    public City City { get; set; }
    public Hub Hub { get; set; }
}