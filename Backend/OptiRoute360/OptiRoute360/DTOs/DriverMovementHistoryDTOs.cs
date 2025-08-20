// 31. DriverMovementHistory DTOs
using System.ComponentModel.DataAnnotations;

public class DriverMovementHistoryDto {
    public Guid Id { get; set; }
    public Guid DriverId { get; set; }
    public Guid VehicleId { get; set; }
    public Guid TripId { get; set; }
    public decimal Longitude { get; set; }
    public decimal Latitude { get; set; }
    public DateTime RecordedAt { get; set; }
    public DateTime ReceivedAt { get; set; }
    public bool IsOffline { get; set; }
}

public class CreateDriverMovementHistoryDto {
    [Required] public Guid DriverId { get; set; }
    [Required] public Guid VehicleId { get; set; }
    [Required] public Guid TripId { get; set; }
    [Required] public decimal Longitude { get; set; }
    [Required] public decimal Latitude { get; set; }
    public bool IsOffline { get; set; } = false;
}

public class UpdateDriverMovementHistoryDto {
    public decimal? Longitude { get; set; }
    public decimal? Latitude { get; set; }
    public bool? IsOffline { get; set; }
}