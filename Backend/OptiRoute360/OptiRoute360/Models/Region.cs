using OptiRoute360.Data.Entities;

public class Region : BaseEntity
{
    public string Name { get; set; }
    public Guid CountryId { get; set; }
    public string Status { get; set; }
    public string Priority { get; set; }
    public string Timezone { get; set; }
    public string Description { get; set; }

    // Navigation properties
    public Country Country { get; set; }
    public ICollection<City> Cities { get; set; }
}