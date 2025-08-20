using OptiRoute360.Data.Entities;

public class Integration : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string Status { get; set; }
    public DateTime LastSync { get; set; }
    public string Url { get; set; }
    public string AppId { get; set; }
    public string ApiKey { get; set; }
    public string Version { get; set; }
    public decimal Usage { get; set; }
}