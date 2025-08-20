// 28. VehiclesType DTOs
using System.ComponentModel.DataAnnotations;

public class VehicleTypeDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Icon { get; set; }
    public string Description { get; set; }
}

public class CreateVehicleTypeDto {
    [Required][StringLength(50)] public string Name { get; set; }
    [Required] public string Icon { get; set; }
    public string Description { get; set; }
}