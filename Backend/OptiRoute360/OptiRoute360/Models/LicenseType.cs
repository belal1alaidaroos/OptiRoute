using OptiRoute360.Data.Entities;

public class LicenseType : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }

    public string Code { get; set; }    

    public string Description { get; set; }
}