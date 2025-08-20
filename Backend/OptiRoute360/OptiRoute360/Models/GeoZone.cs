using OptiRoute360.Data.Entities;

public class GeoZone : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public Guid CityId { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }

    // Navigation properties
    public City City { get; set; }
}