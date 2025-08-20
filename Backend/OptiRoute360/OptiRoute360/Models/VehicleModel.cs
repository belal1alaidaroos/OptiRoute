using OptiRoute360.Data.Entities;

public class VehicleModel : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public Guid MakeId { get; set; }
    public Guid TypeId { get; set; }
    public int YearIntroduced { get; set; }
    public bool IsActive { get; set; }

    // Navigation properties
    public VehicleMake Make { get; set; }
    public VehicleType Type { get; set; }
}