using OptiRoute360.Data.Entities;

public class Tracking : BaseEntity
{
    public Guid TripId { get; set; }
    public string Status { get; set; }
    public int Progress { get; set; }
    public Guid DriverId { get; set; }
    public Guid HubId { get; set; }
    public Guid PeriodId { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int DeliveredPackages { get; set; }
    public int TotalPackages { get; set; }
    public string Locations { get; set; } // JSON serialized

    // Navigation properties
    public Trip Trip { get; set; }
    public Driver Driver { get; set; }
    public Hub Hub { get; set; }
    public Period Period { get; set; }
}