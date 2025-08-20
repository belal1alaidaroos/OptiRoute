using OptiRoute360.Data.Entities;

public class OptionSetValue : BaseEntity
{
    public Guid TableId { get; set; }
    public string OptionSetName { get; set; }
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public int Value { get; set; }
    public bool IsGeneral { get; set; }
    public bool IsActive { get; set; }
}