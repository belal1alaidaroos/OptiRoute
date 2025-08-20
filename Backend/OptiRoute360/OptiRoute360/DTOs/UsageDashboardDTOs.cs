using System.ComponentModel.DataAnnotations;

public class UsageDashboardDto
{
    public Guid Id { get; set; }
    public int ActiveUsers { get; set; }
    public int ActiveVehicles { get; set; }
    public int CompletedTrips { get; set; }
    public int ApiCalls { get; set; }
    public int CpuUsage { get; set; }
    public int MemoryUsage { get; set; }
    public int DiskUsage { get; set; }
    public string NetworkStatus { get; set; }
}

public class CreateUsageDashboardDto
{
    [Range(0, int.MaxValue)] public int ActiveUsers { get; set; }
    [Range(0, int.MaxValue)] public int ActiveVehicles { get; set; }
    [Range(0, int.MaxValue)] public int CompletedTrips { get; set; }
    [Range(0, int.MaxValue)] public int ApiCalls { get; set; }
    [Range(0, 100)] public int CpuUsage { get; set; }
    [Range(0, 100)] public int MemoryUsage { get; set; }
    [Range(0, 100)] public int DiskUsage { get; set; }
    public string NetworkStatus { get; set; }
}

public class UpdateUsageDashboardDto : CreateUsageDashboardDto {}

