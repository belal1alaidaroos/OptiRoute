using OptiRoute360.Data.Entities;

public class Customer : BaseEntity
{
    public string CustomerId { get; set; }
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Phone { get; set; }
    public string Landline { get; set; }
    public string Email { get; set; }
    public Guid CountryId { get; set; }
    public Guid RegionId { get; set; }
    public Guid CityId { get; set; }
    public string Address { get; set; }
    public string Status { get; set; }
    public DateTime JoinDate { get; set; }
    public int TotalOrders { get; set; }
    public decimal TotalValue { get; set; }

    // Navigation properties
    public Country Country { get; set; }
    public Region Region { get; set; }
    public City City { get; set; }
    public ICollection<Shipment> Shipments { get; set; }
}