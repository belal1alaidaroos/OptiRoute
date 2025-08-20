using OptiRoute360.Data.Entities;

public class Trip : BaseEntity
{
    public string TripNumber { get; set; }
    public string TripType { get; set; }
    public Guid DriverId { get; set; }
    public Guid VehicleId { get; set; }
    public Guid StartHubId { get; set; }
    public Guid EndHubId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Status { get; set; }
    public decimal Distance { get; set; }
    public int Duration { get; set; }
    public string Stops { get; set; } // JSON serialized
    public string MapIntegrationKey { get; set; }
    public string Notes { get; set; }

    // Navigation properties
    public Driver Driver { get; set; }
    public Vehicle Vehicle { get; set; }
    public Hub StartHub { get; set; }
    public Hub EndHub { get; set; }
    public ICollection<Shipment> Shipments { get; set; }
    public ICollection<DriverMovementHistory> MovementHistory { get; set; }
}