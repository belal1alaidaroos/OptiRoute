using OptiRoute360.Data.Entities;

public class Vehicle : BaseEntity
{
    public string PlateNumber { get; set; }
    public string PlateChar { get; set; }
    public string AlternativePlateNumber { get; set; }
    public string AlternativePlateChar { get; set; }
    public Guid MakeId { get; set; }
    public Guid ModelId { get; set; }
    public int Year { get; set; }
    public string Type { get; set; }
    public int Capacity { get; set; }
    public string FuelType { get; set; }
    public string Status { get; set; }
    public Guid HubId { get; set; }
    public Guid? DriverId { get; set; }
    public decimal FuelLevel { get; set; }
    public int Mileage { get; set; }
    public string Location { get; set; }
    public DateTime LastMaintenanceDate { get; set; }
    public DateTime NextMaintenanceDate { get; set; }
    public DateTime InsuranceExpiry { get; set; }
    public DateTime RegistrationExpiry { get; set; }
    public string Notes { get; set; }

    // Navigation properties
    public VehicleMake Make { get; set; }
    public VehicleModel Model { get; set; }
    public Hub Hub { get; set; }
    public Driver Driver { get; set; }
    public VehicleDetail VehicleDetail { get; set; }
 
    
    public ICollection<Maintenance> Maintenances { get; set; }
    public ICollection<FuelManagement> FuelRecords { get; set; }
    public ICollection<Trip> Trips { get; set; }
    public ICollection<PreventiveMaintenance> PreventiveMaintenances { get; set; } = new List<PreventiveMaintenance>();
}