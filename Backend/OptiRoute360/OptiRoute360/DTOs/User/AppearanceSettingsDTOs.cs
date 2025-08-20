// 1. AppearanceSettings DTOs
public class AppearanceSettingsDto {
    public Guid UserId { get; set; }

    public string ColorScheme { get; set; }
    public string PrimaryColor { get; set; }

    public string ColorOptions { get; set; } // JSON serialized
    public string FontFamily { get; set; }

    public string LayoutMode { get; set; }
    public string Language { get; set; }
    public string Timezone { get; set; }
    public string DateFormat { get; set; }
    public string TimeFormat { get; set; }
    public string Currency { get; set; }
    public string CurrencySymbol { get; set; }
    public string CurrencyPosition { get; set; } // e.g., "left", "right"
    public string NumberFormat { get; set; } // e.g., "1,234.56"    
    public string DecimalSeparator { get; set; } // e.g., ".", ","

}

public class UpdateAppearanceSettingsDto {
    public Guid UserId { get; set; }

    public string ColorScheme { get; set; }
    public string PrimaryColor { get; set; }

    public string ColorOptions { get; set; } // JSON serialized
    public string FontFamily { get; set; }

    public string LayoutMode { get; set; }
    public string Language { get; set; }
    public string Timezone { get; set; }
    public string DateFormat { get; set; }
    public string TimeFormat { get; set; }
    public string Currency { get; set; }
    public string CurrencySymbol { get; set; }
    public string CurrencyPosition { get; set; } // e.g., "left", "right"
    public string NumberFormat { get; set; } // e.g., "1,234.56"    
    public string DecimalSeparator { get; set; } // e.g., ".", ","

}