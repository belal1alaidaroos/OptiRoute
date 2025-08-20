using OptiRoute360.Data.Entities;

public class Shipment : BaseEntity
{
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
    public decimal? PickupLongitude { get; set; }  
    public decimal? PickupLatitude { get; set; }  
    public decimal DeliveryLongitude { get; set; }  
    public decimal DeliveryLatitude { get; set; }  
    public string MainMobile { get; set; }
    public string SecondaryMobile { get; set; }
    public Guid? DriverId { get; set; }
    public Guid? TripId { get; set; }
    public Guid? HubId { get; set; }
    public DateTime? EstimatedArrival { get; set; }
    public string Dimensions { get; set; }
    public DateTime DeliveryTime { get; set; }
    public DateTime? PickupTime { get; set; }
     public int PeriodValue { get; set; }



    // Navigation properties
    public Customer? Customer { get; set; }
     public Driver? Driver { get; set; }
    public Trip? Trip { get; set; }
    public Hub? Hub { get; set; }
    public Period  Period { get; set; }

}