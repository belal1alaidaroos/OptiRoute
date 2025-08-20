// 11. GeneralSettings DTOs
using System.ComponentModel.DataAnnotations;

public class GeneralSettingsDto {
    public string Timezone { get; set; }
    public string DateFormat { get; set; }
    public string TimeFormat { get; set; }
    public string Currency { get; set; }
    public string DefaultLanguage { get; set; }
}

public class UpdateGeneralSettingsDto {
    [Required] public string Timezone { get; set; }
    [Required] public string DateFormat { get; set; }
    [Required] public string TimeFormat { get; set; }
    [Required] public string Currency { get; set; }
    [Required] public string DefaultLanguage { get; set; }
}