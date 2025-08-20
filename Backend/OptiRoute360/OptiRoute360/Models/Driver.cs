using OptiRoute360.Data.Entities;

public class Driver : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string License { get; set; }
    public Guid LicenseTypeId { get; set; }
    public Guid VehicleTypeId { get; set; }
    public Guid HubId { get; set; }
    public string Status { get; set; }
    public int Trips { get; set; }
    public decimal Rating { get; set; }
    public DateTime JoinDate { get; set; }
    public string Address { get; set; }
    public DateTime LicenseExpiry { get; set; }

    // Navigation properties
    public LicenseType LicenseType { get; set; }
    public VehicleType VehicleType { get; set; }
    public Hub Hub { get; set; }
    public ICollection<Trip> Trip { get; set; }
    public ICollection<Vehicle> AssignedVehicles { get; set; }
    public ICollection<FuelManagement > FuelManagements { get; set; } = new List<FuelManagement>();
    public ICollection<DriverMovementHistory> MovementHistory { get; set; }
}