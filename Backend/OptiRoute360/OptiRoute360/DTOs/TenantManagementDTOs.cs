// 36. TenantManagement DTOs
using System.ComponentModel.DataAnnotations;

public class ValidateSubdomainDto {
    [Required] public string Subdomain { get; set; }
}