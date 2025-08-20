namespace OptiRoute360.Services
{
    public interface IAuditable
    {
        Guid CreatedBy { get; set; }
        DateTime CreatedAt { get; set; }
        Guid UpdatedBy { get; set; }
        DateTime? UpdatedAt { get; set; }
    }
}
