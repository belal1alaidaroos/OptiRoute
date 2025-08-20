using OptiRoute360.Data.Entities;

public class SMSTemplate : BaseEntity
{
    public string TemplateName { get; set; }
    public string Category { get; set; }
    public string Content { get; set; }
    public string Variables { get; set; } // JSON serialized array
    public int UsageCount { get; set; }
    public DateTime LastUsed { get; set; }
    public string Status { get; set; }
    public string Language { get; set; }
}