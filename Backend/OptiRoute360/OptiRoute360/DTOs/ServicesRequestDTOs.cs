// 23. ServicesRequest DTOs
using System.ComponentModel.DataAnnotations;

public class ServicesRequestDto {
    public Guid Id { get; set; }
    public string ServiceType { get; set; }
    public Guid VehicleId { get; set; }
    public string VehiclePlate { get; set; }
    public Guid WorkshopId { get; set; }
    public string WorkshopName { get; set; }
    public DateTime Date { get; set; }
    public string Status { get; set; }
    public string Priority { get; set; }
}

public class CreateServicesRequestDto {
    [Required] public string ServiceType { get; set; }
    [Required] public Guid VehicleId { get; set; }
    [Required] public Guid WorkshopId { get; set; }
    [Required] public DateTime Date { get; set; }
    [Required] public string Priority { get; set; }
}