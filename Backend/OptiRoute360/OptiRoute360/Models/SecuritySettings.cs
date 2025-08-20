using OptiRoute360.Data.Entities;

public class SecuritySettings : BaseEntity
{
    public bool TwoFactorAuth { get; set; }
    public bool PasswordChangeRequired { get; set; }
    public int SessionTimeout { get; set; }
    public bool LoginAlerts { get; set; }
    public bool DeviceManagement { get; set; }
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string ConfirmPassword { get; set; }
}