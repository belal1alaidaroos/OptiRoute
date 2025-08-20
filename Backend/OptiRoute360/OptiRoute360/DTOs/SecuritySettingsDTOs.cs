// 21. SecuritySettings DTOs
using System.ComponentModel.DataAnnotations;

public class SecuritySettingsDto {
    public bool TwoFactorAuth { get; set; }
    public bool PasswordChangeRequired { get; set; }
    public int SessionTimeout { get; set; }
    public bool LoginAlerts { get; set; }
    public bool DeviceManagement { get; set; }
}

public class UpdateSecuritySettingsDto {
    public bool TwoFactorAuth { get; set; }
    public bool PasswordChangeRequired { get; set; }
    [Range(1, 1440)] public int SessionTimeout { get; set; }
    public bool LoginAlerts { get; set; }
    public bool DeviceManagement { get; set; }
}