using OptiRoute360.Data.Entities;

public class FuelManagement : BaseEntity
{
    public Guid VehicleId { get; set; }
    public Guid DriverId { get; set; }
    public Guid FuelStationId { get; set; }
    public string FuelType { get; set; }
    public decimal Quantity { get; set; }
    public decimal PricePerLiter { get; set; }
    public decimal TotalCost { get; set; }
    public int Mileage { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan Time { get; set; }
    public string Location { get; set; }
    public string ReceiptNumber { get; set; }
    public string Notes { get; set; }
    public string PaymentMethod { get; set; }
    public bool Approved { get; set; }
    public decimal Longitude { get; set; }
    public decimal Latitude { get; set; }
    public decimal Efficiency { get; set; }

    // Navigation properties
    public Vehicle Vehicle { get; set; }
    public Driver Driver { get; set; }
    public Workshop FuelStation { get; set; }
    public Guid HubId { get; set; }  // Foreign Relation
    public Hub Hub { get; set; }
}