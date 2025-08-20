using OptiRoute360.Data.Entities;

public class ErrorLog : BaseEntity
{
    public DateTime Timestamp { get; set; }
    public int Severity { get; set; }
    public int Status { get; set; }
    public string Message { get; set; }
    public string Details { get; set; }
    public int Source { get; set; }
    public string ErrorCode { get; set; }
    public int AffectedUsers { get; set; }
    public string StackTrace { get; set; }
    public string Resolution { get; set; }
    public Guid AssignedToId { get; set; }

    // Navigation properties
    public User AssignedTo { get; set; }
}