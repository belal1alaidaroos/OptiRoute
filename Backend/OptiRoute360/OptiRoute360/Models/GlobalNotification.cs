using OptiRoute360.Data.Entities;

public class GlobalNotification : BaseEntity
{
    public string Title { get; set; }
    public string Message { get; set; }
    public string Type { get; set; }
    public string Priority { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Recipients { get; set; } // JSON serialized
    public string Channels { get; set; } // JSON serialized
}