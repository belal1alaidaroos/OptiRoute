using System.ComponentModel.DataAnnotations;

public class MaintenanceTypeDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
}

public class CreateMaintenanceTypeDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [MaxLength(50)]
    public string Code { get; set; }

    [MaxLength(500)]
    public string Description { get; set; }
}

public class UpdateMaintenanceTypeDto
{
    [MaxLength(100)]
    public string Name { get; set; }

    [MaxLength(50)]
    public string Code { get; set; }

    [MaxLength(500)]
    public string Description { get; set; }

    public string Status { get; set; }
}

