// 30. Hubs DTOs
using System.ComponentModel.DataAnnotations;

public class HubDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid CityId { get; set; }
    public string CityName { get; set; }
    public Guid ManagerId { get; set; }
    public string ManagerName { get; set; }
    public Guid SupervisorId { get; set; }
    public string SupervisorName { get; set; }
    public int VehiclesCapacity { get; set; }
    public int DriversCapacity { get; set; }
    public string Status { get; set; }
}

public class UpdateHubCapacityDto {
    [Range(1, 1000)] public int VehiclesCapacity { get; set; }
    [Range(1, 500)] public int DriversCapacity { get; set; }
}
public class UpdateHubDto
{
    public string Name { get; set; }
    public Guid CityId { get; set; }
    public Guid? ManagerId { get; set; }
    public Guid? SupervisorId { get; set; }
    public int VehiclesCapacity { get; set; }
    public int DriversCapacity { get; set; }
    public string Status { get; set; }
    // ... أي خصائص إضافية تريد تحديثها
}
