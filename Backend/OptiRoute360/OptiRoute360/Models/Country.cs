using OptiRoute360.Data.Entities;

public class Country : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Code { get; set; }
    public string Status { get; set; }
    public string Priority { get; set; }
    public string Currency { get; set; }
    public string Timezone { get; set; }
    public string Description { get; set; }


    // Navigation properties
    public ICollection<Region> Regions { get; set; }
    public ICollection<City> Cities { get; set; }
}