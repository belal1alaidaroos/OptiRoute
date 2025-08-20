// 29. Workshops DTOs
using System.ComponentModel.DataAnnotations;

public class WorkshopDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid CityId { get; set; }
    public string CityName { get; set; }
    public string Phone { get; set; }
    public string Specialties { get; set; }
    public decimal Rating { get; set; }
    public string Status { get; set; }
    public string Type { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
}

public class CreateWorkshopDto {
    [Required][StringLength(100)] public string Name { get; set; }
    [Required] public Guid CityId { get; set; }
    [Required][Phone] public string Phone { get; set; }
    [Required] public string Specialties { get; set; }
    [Required] public string Type { get; set; }
    [Required] public decimal Latitude { get; set; }
    [Required] public decimal Longitude { get; set; }
}