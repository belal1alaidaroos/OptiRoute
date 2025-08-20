using OptiRoute360.Data.Entities;

public class City : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public Guid RegionId { get; set; }
    public Guid CountryId { get; set; }
    public string PostalCode { get; set; }
    public string Status { get; set; }
    public string Priority { get; set; }
    public string Timezone { get; set; }
    public string Description { get; set; }

    // Navigation properties
    public Region Region { get; set; }
    public Country Country { get; set; }
    public ICollection<GeoZone> GeoZones { get; set; }
    public ICollection<Hub> Hubs { get; set; }
    public ICollection<Workshop> Workshops { get; set; } = new List<Workshop>();

}