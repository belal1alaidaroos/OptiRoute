// 3. AuditLogs DTOs
public class AuditLogDto {
    public Guid Id { get; set; }
    public DateTime Timestamp { get; set; }
    public Guid UserId { get; set; }
    public string UserName { get; set; }
    public string UserRole { get; set; }
    public string Action { get; set; }
    public string Resource { get; set; }
    public string Details { get; set; }
    public int Severity { get; set; }
    public int Status { get; set; }
}