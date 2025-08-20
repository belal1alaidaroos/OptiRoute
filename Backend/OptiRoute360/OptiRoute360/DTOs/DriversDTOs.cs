// 41. Drivers DTOs
using System.ComponentModel.DataAnnotations;

public class DriverDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string LicenseNumber { get; set; }
    public Guid LicenseTypeId { get; set; }
    public string LicenseTypeName { get; set; }
    public Guid VehicleTypeId { get; set; }
    public string VehicleTypeName { get; set; }
    public Guid HubId { get; set; }
    public string HubName { get; set; }
    public DateTime JoinDate { get; set; }
    public int Trips { get; set; }
    public decimal Rating { get; set; }
    public string Status { get; set; }
}

public class CreateDriverDto {
    [Required] public string Name { get; set; }
    [Required] public string LicenseNumber { get; set; }
    [Required] public Guid LicenseTypeId { get; set; }
    [Required] public Guid VehicleTypeId { get; set; }
    [Required] public Guid HubId { get; set; }
}

public class UpdateDriverDto {
    public string Name { get; set; }
    public string LicenseNumber { get; set; }
    public Guid? LicenseTypeId { get; set; }
    public Guid? VehicleTypeId { get; set; }
    public Guid? HubId { get; set; }
    public string Status { get; set; }
}

public class UpdateRatingDto {
    [Range(1, 5)] public decimal NewRating { get; set; }
}