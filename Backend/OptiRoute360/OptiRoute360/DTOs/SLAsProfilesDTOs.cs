// 33. SLAsProfiles DTOs
using System.ComponentModel.DataAnnotations;

public class SLAsProfileDto {
    public Guid Id { get; set; }
    public string SLAName { get; set; }
    public int ResponseTime { get; set; }
    public int ResolutionTime { get; set; }
    public string Priority { get; set; }
    public string Status { get; set; }
}

public class CreateSLAsProfileDto {
    [Required][StringLength(100)] public string SLAName { get; set; }
    [Required][Range(1, 999)] public int ResponseTime { get; set; }
    [Required][Range(1, 999)] public int ResolutionTime { get; set; }
    [Required] public string Priority { get; set; }
}