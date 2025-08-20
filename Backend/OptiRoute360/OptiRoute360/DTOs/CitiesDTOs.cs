// 38. Cities DTOs
using System.ComponentModel.DataAnnotations;

public class CityDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public Guid RegionId { get; set; }
    public string RegionName { get; set; }
    public Guid CountryId { get; set; }
    public string CountryName { get; set; }
    public string PostalCode { get; set; }
    public string Status { get; set; }
    public string Priority { get; set; }
    public string Timezone { get; set; }
    public string Description { get; set; }
}

public class CreateCityDto {
    [Required][StringLength(100)] public string Name { get; set; }
    [StringLength(100)] public string AlternativeName { get; set; }
    [Required] public Guid RegionId { get; set; }
    [Required] public Guid CountryId { get; set; }
    public string PostalCode { get; set; }
    public string Status { get; set; }
    public string Timezone { get; set; }
    public string Priority { get; set; }
    public string Description { get; set; }
}

public class UpdateCityDto {
    [StringLength(100)] public string Name { get; set; }
    [StringLength(100)] public string AlternativeName { get; set; }
    public Guid? RegionId { get; set; }
    public Guid? CountryId { get; set; }
    public string Status { get; set; }
    public string PostalCode { get; set; }
    public string Timezone { get; set; }
    public string Priority { get; set; }
    public string Description { get; set; }
}