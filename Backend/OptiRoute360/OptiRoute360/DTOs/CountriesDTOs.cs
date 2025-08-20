// 42. Countries DTOs
using System.ComponentModel.DataAnnotations;

public class CountryDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Code { get; set; }
    public string Status { get; set; }
    public string Currency { get; set; }
    public string Timezone { get; set; }
}

public class CreateCountryDto {
    [Required][MaxLength(100)] public string Name { get; set; }
    [MaxLength(100)] public string AlternativeName { get; set; }
    [Required][MaxLength(10)] public string Code { get; set; }
    public string Currency { get; set; }
    public string Timezone { get; set; }
}

public class UpdateCountryDto {
    [MaxLength(100)] public string Name { get; set; }
    [MaxLength(100)] public string AlternativeName { get; set; }
    public string Status { get; set; }
}