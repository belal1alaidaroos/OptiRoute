using OptiRoute360.Data.Entities;

public class OptionSetValue : BaseEntity
{
    public string OptionSetName { get; set; }
    public string OwnerEntity { get; set; } // e.g., "Vehicle", "Driver" (nullable)
    public Guid? OwnerId { get; set; }      // record-scoped (nullable)

    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Code { get; set; }        // stable key
    public int? Value { get; set; }
    public int SortOrder { get; set; } = 0;
    public bool IsGeneral { get; set; }     // global within tenant
    public bool IsActive { get; set; } = true;
    public string Metadata { get; set; }    // optional JSON
}