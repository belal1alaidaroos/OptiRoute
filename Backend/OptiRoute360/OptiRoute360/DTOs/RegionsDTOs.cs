// 20. Regions DTOs
using System.ComponentModel.DataAnnotations;

public class RegionDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid CountryId { get; set; }
    public string CountryName { get; set; }
    public string Status { get; set; }
    public string Timezone { get; set; }
}

public class CreateRegionDto {
    [Required][StringLength(100)] public string Name { get; set; }
    [Required] public Guid CountryId { get; set; }
    [Required] public string Timezone { get; set; }
}

public class UpdateRegionDto {
    [StringLength(100)] public string Name { get; set; }
    public Guid? CountryId { get; set; }
    public string Status { get; set; }
    public string Timezone { get; set; }
}