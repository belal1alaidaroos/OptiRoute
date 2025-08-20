// 16. NotificationsCenter DTOs
using System.ComponentModel.DataAnnotations;

public class NotificationsCenterDto {
    public Guid UserId { get; set; }
    public List<NotificationDto> Notifications { get; set; }
}

public class NotificationDto {
    public Guid Id { get; set; }
    public string Type { get; set; }
    public string Title { get; set; }
    public string Message { get; set; }
    public DateTime Timestamp { get; set; }
    public string Status { get; set; }
    public string Priority { get; set; }
}

public class MarkNotificationsReadDto {
    [Required] public List<Guid> NotificationIds { get; set; }
}