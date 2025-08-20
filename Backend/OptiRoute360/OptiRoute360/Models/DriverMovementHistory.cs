using OptiRoute360.Data.Entities;

public class DriverMovementHistory : BaseEntity
{
    public Guid DriverId { get; set; }
    public Guid VehicleId { get; set; }
    public Guid TripId { get; set; }
    public decimal Longitude { get; set; }
    public decimal Latitude { get; set; }
    public DateTime RecordedAt { get; set; }
    public DateTime ReceivedAt { get; set; }
    public bool IsOffline { get; set; }

    // Navigation properties
    public Driver Driver { get; set; }
    public Vehicle Vehicle { get; set; }
    public Trip Trip { get; set; }
}