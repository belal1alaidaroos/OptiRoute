using OptiRoute360.Data.Entities;

public class VehicleMake : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Country { get; set; }
    public bool Popular { get; set; }

    // Navigation properties
    public ICollection<VehicleModel> Models { get; set; }
}