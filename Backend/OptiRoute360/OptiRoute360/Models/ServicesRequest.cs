using OptiRoute360.Data.Entities;

public class ServicesRequest : BaseEntity
{
    public string SearchTerm { get; set; }
    public string SelectedStatus { get; set; }
    public string Requests { get; set; } // JSON serialized array
    public string Vehicles { get; set; } // JSON serialized array
    public string Workshops { get; set; } // JSON serialized array
    public string Cities { get; set; } // JSON serialized array
}