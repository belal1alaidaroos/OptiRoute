using OptiRoute360.Data.Entities;

public class GeneralSettings : BaseEntity
{
    public string Timezone { get; set; }
    public string DateFormat { get; set; }
    public string TimeFormat { get; set; }
    public string Currency { get; set; }
    public string DefaultLanguage { get; set; }
}