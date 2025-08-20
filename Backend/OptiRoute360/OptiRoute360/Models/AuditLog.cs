using OptiRoute360.Data.Entities;

public class AuditLog : BaseEntity
{
    public DateTime Timestamp { get; set; }
    public Guid UserId { get; set; }
    public string UserRole { get; set; }
    public int Action { get; set; }
    public string Resource { get; set; }
    public string Details { get; set; }
    public string IPAddress { get; set; }
    public string UserAgent { get; set; }
    public int Severity { get; set; }
    public int Status { get; set; }

    // Navigation properties
    public User User { get; set; }
}