using OptiRoute360.Data.Entities;

public class FuelType : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Code { get; set; }
    public decimal EmissionFactor { get; set; }
    public string Status { get; set; }
    public string Category { get; set; }
    public string Unit { get; set; }
    public string Description { get; set; }
    public DateTime CreatedDate { get; set; }
}