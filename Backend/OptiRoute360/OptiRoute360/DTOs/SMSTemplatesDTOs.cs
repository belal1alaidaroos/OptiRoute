// 34. SMSTemplates DTOs
using System.ComponentModel.DataAnnotations;

public class SMSTemplateDto {
    public Guid Id { get; set; }
    public string TemplateName { get; set; }
    public string Category { get; set; }
    public string Content { get; set; }
    public string Language { get; set; }
}

public class CreateSMSTemplateDto {
    [Required] public string TemplateName { get; set; }
    [Required] public string Category { get; set; }
    [Required] public string Content { get; set; }
    [Required] public string Language { get; set; }
}

public class PreviewSMSTemplateDto {
    public string Content { get; set; }
    public Dictionary<string, string> Variables { get; set; }
}