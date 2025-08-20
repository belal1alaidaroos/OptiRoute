// 27. VehiclesModel DTOs
using System.ComponentModel.DataAnnotations;

public class VehicleModelDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid MakeId { get; set; }
    public string MakeName { get; set; }
    public Guid TypeId { get; set; }
    public string TypeName { get; set; }
    public int YearIntroduced { get; set; }
    public bool IsActive { get; set; }
}

public class CreateVehicleModelDto {
    [Required][StringLength(100)] public string Name { get; set; }
    [Required] public Guid MakeId { get; set; }
    [Required] public Guid TypeId { get; set; }
    [Range(1900, 2100)] public int YearIntroduced { get; set; }
}