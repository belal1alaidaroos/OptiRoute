using OptiRoute360.Data.Entities;

public class SLAsProfile : BaseEntity
{
    public string SLAName { get; set; }
    public int ResponseTime { get; set; }
    public int ResolutionTime { get; set; }
    public string Priority { get; set; }
    public string Status { get; set; }
    public string ApplicableTo { get; set; } // JSON serialized
}