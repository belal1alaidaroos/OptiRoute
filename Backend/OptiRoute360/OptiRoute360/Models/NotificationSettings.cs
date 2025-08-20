using OptiRoute360.Data.Entities;

public class NotificationSettings : BaseEntity
{
    public bool EmailNotifications { get; set; }
    public bool SmsNotifications { get; set; }
    public bool PushNotifications { get; set; }
    public bool MaintenanceAlerts { get; set; }
    public bool RouteUpdates { get; set; }
    public bool DeliveryStatus { get; set; }
    public bool SoundEnabled { get; set; }
    public bool VibrationEnabled { get; set; }
    public Guid UserId { get; set; } //  
    public User User { get; set; }
}