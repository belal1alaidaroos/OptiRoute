using OptiRoute360.Data.Entities;

public class Hub : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public Guid CityId { get; set; }
    public Guid ManagerId { get; set; }
    public Guid SupervisorId { get; set; }
    public decimal Longitude { get; set; }
    public decimal Latitude { get; set; }
    public int VehiclesCapacity { get; set; }
    public int DriversCapacity { get; set; }
    public string ShipmentsType { get; set; }
    public string LandLine { get; set; }
    public string Mobile { get; set; }
    public TimeSpan WorkingFrom { get; set; }
    public TimeSpan ClosedOn { get; set; }
    public string Status { get; set; }
    public string Address { get; set; }
    public Guid ZoneId { get; set; }
    public decimal CoverageRadius { get; set; }
    public Guid NearestWarehouseId { get; set; }
    public string AccessibilityNotes { get; set; }
    public string HubCode { get; set; }
    public DateTime OperationalSince { get; set; }
    public string TimeZone { get; set; }
    public bool Is24By7 { get; set; }
    public string ServiceLevelAgreement { get; set; }
    public int StorageCapacity { get; set; }
    public int ActiveVehiclesCount { get; set; }
    public int ActiveDriversCount { get; set; }
    public decimal FuelStorageCapacity { get; set; }
    public string SpecialEquipment { get; set; }
    public string EmergencyContact { get; set; }
    public string ComplianceCertificates { get; set; }
    public string InsurancePolicyNumber { get; set; }
    public bool HasAutomatedSorting { get; set; }
    public string IntegratedSystems { get; set; }
    public DateTime LastSystemSync { get; set; }
    public decimal OperatingCostPerMonth { get; set; }
    public decimal RevenuePerMonth { get; set; }
    public string BudgetCode { get; set; }

    // Navigation properties
    public City City { get; set; }
    public User Manager { get; set; }
    public User Supervisor { get; set; }
    public GeoZone Zone { get; set; }
    public Hub NearestWarehouse { get; set; }
    public ICollection<Vehicle> Vehicles { get; set; }
    public ICollection<Driver> Drivers { get; set; }
    public ICollection<Shipment> Shipments { get; set; }
    public ICollection<Maintenance> Maintenances { get; set; }
    public ICollection<PreventiveMaintenance> PreventiveMaintenances { get; set; }
    public ICollection<FuelManagement> FuelRecords { get; set; }
    public ICollection<Tracking> Trackings { get; set; }
  
}