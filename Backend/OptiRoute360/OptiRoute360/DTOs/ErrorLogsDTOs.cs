// 43. ErrorLogs DTOs
using System.ComponentModel.DataAnnotations;

public class ErrorLogDto {
    public Guid Id { get; set; }
    public DateTime Timestamp { get; set; }
    public int Severity { get; set; }
    public int Status { get; set; }
    public string Message { get; set; }
    public int Source { get; set; }
    public string ErrorCode { get; set; }
}

public class UpdateErrorLogStatusDto {
    [Required] public int Status { get; set; }
    public string Resolution { get; set; }
}