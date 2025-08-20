// 10. FuelsType DTOs
using System.ComponentModel.DataAnnotations;

public class FuelTypeDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public decimal EmissionFactor { get; set; }
    public string Status { get; set; }
    public string Category { get; set; }
    public string Unit { get; set; }
}

public class CreateFuelTypeDto {
    [Required][StringLength(50)] public string Name { get; set; }
    [Required][StringLength(10)] public string Code { get; set; }
    [Required] public string Unit { get; set; }
}