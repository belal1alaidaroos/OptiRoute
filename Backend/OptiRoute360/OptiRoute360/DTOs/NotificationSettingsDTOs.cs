// 17. NotificationSettings DTOs
public class NotificationSettingsDto {
    public bool EmailNotifications { get; set; }
    public bool SmsNotifications { get; set; }
    public bool PushNotifications { get; set; }
    public bool MaintenanceAlerts { get; set; }
    public bool RouteUpdates { get; set; }
    public bool DeliveryStatus { get; set; }
    public bool SoundEnabled { get; set; }
    public bool VibrationEnabled { get; set; }
}

public class UpdateNotificationSettingsDto {
    public bool EmailNotifications { get; set; }
    public bool SmsNotifications { get; set; }
    public bool PushNotifications { get; set; }
    public bool MaintenanceAlerts { get; set; }
    public bool RouteUpdates { get; set; }
    public bool DeliveryStatus { get; set; }
    public bool SoundEnabled { get; set; }
    public bool VibrationEnabled { get; set; }
}