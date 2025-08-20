using OptiRoute360.Data.Entities;

public class VehicleDetail : BaseEntity
{
    public Guid VehicleId { get; set; }
    public Guid MakeId { get; set; }
    public Guid ModelId { get; set; }
    public int Year { get; set; }
    public string VIN { get; set; }
    public string LicensePlate { get; set; }
    public string FuelType { get; set; }
    public int CurrentMileage { get; set; }
    public string Status { get; set; }
    public DateTime LastService { get; set; }
    public DateTime NextService { get; set; }
    public decimal AvgFuelConsumption { get; set; }
    public string Engine { get; set; }
    public string Transmission { get; set; }
    public decimal FuelCapacity { get; set; }
    public decimal Weight { get; set; }

    // Navigation properties
    public Vehicle Vehicle { get; set; }
    public VehicleMake Make { get; set; }
    public VehicleModel Model { get; set; }
}