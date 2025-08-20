// 32. Shipments DTOs
using System.ComponentModel.DataAnnotations;

public class ShipmentDto {
    public Guid Id { get; set; }
    public string ShipmentNumber { get; set; }
    public Guid CustomerId { get; set; }
    public string PickupAddress { get; set; }
    public string DeliveryAddress { get; set; }
    public DateTime PickupDate { get; set; }
    public int Status { get; set; }
    public decimal Weight { get; set; }
    public decimal Value { get; set; }
    public string Notes { get; set; }
    public int Type { get; set; }
    public Guid PeriodId { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int Duration { get; set; }
    public string MainMobile { get; set; }
    public string SecondaryMobile { get; set; }
    public decimal? PickupLongitude { get; set; }
    public decimal? PickupLatitude { get; set; }
    public decimal DeliveryLongitude { get; set; }
    public decimal DeliveryLatitude { get; set; }
    public Guid? DriverId { get; set; }
    public Guid? TripId { get; set; }
    public Guid? HubId { get; set; }
    public DateTime? EstimatedArrival { get; set; }
    public int Period { get; set; }

}

public class CreateShipmentDto {
    [Required] public Guid CustomerId { get; set; }
    [Required] public string PickupAddress { get; set; }
    [Required] public string DeliveryAddress { get; set; }
    [Required] public DateTime PickupDate { get; set; }
    [Required] public string Status { get; set; } = "Pending";
    [Required] public decimal Weight { get; set; }
    public decimal Value { get; set; }
    public string Notes { get; set; }
    [Required] public int Type { get; set; }
    [Required] public Guid PeriodId { get; set; }
    [Required] public TimeSpan StartTime { get; set; }
    [Required] public TimeSpan EndTime { get; set; }

    public string MainMobile { get; set; }
    public string SecondaryMobile { get; set; }
    public decimal? PickupLongitude { get; set; }
    public decimal? PickupLatitude { get; set; }
    public decimal DeliveryLongitude { get; set; }
    public decimal DeliveryLatitude { get; set; }

    public Guid? DriverId { get; set; }
    public Guid? TripId { get; set; }
    public Guid? HubId { get; set; }

}

public class UpdateShipmentStatusDto {
    [Required] public int Status { get; set; }
    public DateTime DeliveryTime { get; set; }
    public DateTime? PickupTime { get; set; }

}