// 2. Attachments DTOs
using System.ComponentModel.DataAnnotations;

public class AttachmentDto {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string Size { get; set; }
    public Guid UploadedById { get; set; }
    public string UploadedByName { get; set; }
    public DateTime UploadDate { get; set; }
    public string FileUrl { get; set; }
}

public class CreateAttachmentDto {
    [Required] public IFormFile File { get; set; }
    [Required] public string Name { get; set; }
    [Required] public string Type { get; set; }
    [Required] public Guid UploadedById { get; set; }
}