// 40. Trips DTOs
using System.ComponentModel.DataAnnotations;

public class TripDto {
    public Guid Id { get; set; }
    public string TripNumber { get; set; }
    public string TripType { get; set; }
    public Guid DriverId { get; set; }
    public string DriverName { get; set; }
    public Guid VehicleId { get; set; }
    public string VehiclePlateNumber { get; set; }
    public Guid StartHubId { get; set; }
    public string StartHubName { get; set; }
    public Guid EndHubId { get; set; }
    public string EndHubName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string Status { get; set; }
    public decimal? Distance { get; set; }
    public int? Duration { get; set; }
    public string Stops { get; set; }
}

public class CreateTripDto {
    [Required] public string TripType { get; set; }
    [Required] public Guid DriverId { get; set; }
    [Required] public Guid VehicleId { get; set; }
    [Required] public Guid StartHubId { get; set; }
    [Required] public Guid EndHubId { get; set; }
    [Required] public DateTime StartDate { get; set; }
}

public class UpdateTripDto {
    public Guid? DriverId { get; set; }
    public Guid? VehicleId { get; set; }
    public string Status { get; set; }
}

public class CompleteTripDto {
    [Required][Range(0.1, 10000)] public decimal Distance { get; set; }
    [Required][Range(1, 10000)] public int Duration { get; set; }
}