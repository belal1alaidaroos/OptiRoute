using OptiRoute360.Data.Entities;

public class UsageDashboard : BaseEntity
{
    public int ActiveUsers { get; set; }
    public int ActiveVehicles { get; set; }
    public int CompletedTrips { get; set; }
    public int ApiCalls { get; set; }
    public int CpuUsage { get; set; }
    public int MemoryUsage { get; set; }
    public int DiskUsage { get; set; }
    public string NetworkStatus { get; set; }
}