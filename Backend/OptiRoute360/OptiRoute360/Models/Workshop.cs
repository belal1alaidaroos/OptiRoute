using OptiRoute360.Data.Entities;

public class Workshop : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Location { get; set; }
    public Guid CityId { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Specialties { get; set; }
    public decimal Rating { get; set; }
    public string Status { get; set; }
    public int Capacity { get; set; }
    public int CurrentJobs { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public string Type { get; set; }

    // Navigation properties
    public City City { get; set; }
    public ICollection<Maintenance> Maintenances { get; set; }
    public ICollection<ServicesRequest> ServiceRequests { get; set; }
    public ICollection<FuelManagement> FuelManagements { get; set; }

}