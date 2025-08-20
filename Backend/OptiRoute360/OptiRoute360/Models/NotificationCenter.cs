using OptiRoute360.Data.Entities;

public class NotificationCenter : BaseEntity
{
    public string SearchTerm { get; set; }
    public string SelectedType { get; set; }
    public string SelectedStatus { get; set; }
    public string Notifications { get; set; } // JSON serialized array
    public Guid UserId { get; set; } // Assuming this is a string, adjust as necessary
}