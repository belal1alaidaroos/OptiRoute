using OptiRoute360.Data.Entities;

public class VehicleType : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Icon { get; set; }
    public string Description { get; set; }
}