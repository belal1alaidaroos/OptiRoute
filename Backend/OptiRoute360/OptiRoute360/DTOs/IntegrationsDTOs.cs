// 14. Integrations DTOs
using System.ComponentModel.DataAnnotations;

public class IntegrationDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string Status { get; set; }
    public DateTime LastSync { get; set; }
    public string Url { get; set; }
    public string ApiKey { get; set; }
}

public class CreateIntegrationDto {
    [Required][StringLength(100)] public string Name { get; set; }
    public string Description { get; set; }
    [Required] public string Category { get; set; }
    [Required] public string Url { get; set; }
    [Required] public string ApiKey { get; set; }
}