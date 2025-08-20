using OptiRoute360.Data.Entities;

public class Attachment : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Type { get; set; }
    public string Size { get; set; }
    public Guid UploadedById { get; set; }
    public DateTime UploadDate { get; set; }
    public Guid CategoryId { get; set; }
    public string Tags { get; set; } // JSON serialized
    public string Thumbnail { get; set; }
    public string FileUrl { get; set; }

    
    // Navigation properties
    public User UploadedBy { get; set; }
}