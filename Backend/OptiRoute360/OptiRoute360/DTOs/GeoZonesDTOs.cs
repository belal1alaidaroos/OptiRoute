// 12. GeoZones DTOs
using System.ComponentModel.DataAnnotations;

public class GeoZoneDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid CityId { get; set; }
    public string CityName { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
}

public class CreateGeoZoneDto {
    [Required][StringLength(100)] public string Name { get; set; }
    [Required] public Guid CityId { get; set; }
    public string Description { get; set; }
}