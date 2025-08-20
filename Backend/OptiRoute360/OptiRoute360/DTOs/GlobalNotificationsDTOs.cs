// 13. GlobalNotifications DTOs
using System.ComponentModel.DataAnnotations;

public class GlobalNotificationDto {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Message { get; set; }
    public string Type { get; set; }
    public string Priority { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateGlobalNotificationDto {
    [Required][StringLength(200)] public string Title { get; set; }
    [Required] public string Message { get; set; }
    [Required] public string Type { get; set; }
    [Required] public string Priority { get; set; }
}