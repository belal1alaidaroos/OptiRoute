using System.ComponentModel.DataAnnotations;

public class LicenseTypeDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
}

public class CreateLicenseTypeDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
    [MaxLength(100)]
    public string AlternativeName { get; set; }
    [MaxLength(50)]
    public string Code { get; set; }
    [MaxLength(500)]
    public string Description { get; set; }
}

public class UpdateLicenseTypeDto
{
    [MaxLength(100)]
    public string Name { get; set; }
    [MaxLength(100)]
    public string AlternativeName { get; set; }
    [MaxLength(50)]
    public string Code { get; set; }
    [MaxLength(500)]
    public string Description { get; set; }
}

