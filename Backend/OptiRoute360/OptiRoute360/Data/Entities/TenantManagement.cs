using OptiRoute360.Data.Entities;
public class TenantManagement
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
    public DateTime? DeletedAt { get; set; }

    public Guid CreatedBy { get; set; }
    public Guid? DeletedBy { get; set; }
    public Guid? ModifiedBy { get; set; }

    // TenantManagement ما يحتاج TenantId كـ FK
    public bool? IsDeleted { get; set; } = false;

    public string CompanyName { get; set; }
    public string CompanyAlternativeName { get; set; }
    public string ContactPerson { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public Guid CityId { get; set; }
    public Guid CountryId { get; set; }
    public string Website { get; set; }
    public string Industry { get; set; }
    public string SubscriptionPlan { get; set; }
    public string Status { get; set; }
    public int MaxUsers { get; set; }
    public int MaxVehicles { get; set; }
    public int CurrentUsers { get; set; }
    public int CurrentVehicles { get; set; }
    public string Features { get; set; }
    public bool IsDefault { get; set; }

    public City City { get; set; }
    public Country Country { get; set; }
    public ICollection<SupportTicket> SupportTickets { get; set; } = new List<SupportTicket>();
}

//public class TenantManagement : BaseEntity
//{
//    public string CompanyName { get; set; }
//    public string CompanyAlternativeName { get; set; }
//    public string ContactPerson { get; set; }
//    public string Email { get; set; }
//    public string Phone { get; set; }
//    public string Address { get; set; }
//    public Guid CityId { get; set; }
//    public Guid CountryId { get; set; }
//    public string Website { get; set; }
//    public string Industry { get; set; }
//    public string SubscriptionPlan { get; set; }
//    public string Status { get; set; }
//    public int MaxUsers { get; set; }
//    public int MaxVehicles { get; set; }
//    public int CurrentUsers { get; set; }
//    public int CurrentVehicles { get; set; }
//    public string Features { get; set; } // JSON serialized

//    // Navigation properties
//    public City City { get; set; }
//    public Country Country { get; set; }
//    public Boolean  IsDefault { get; set; }
//    public ICollection<SupportTicket> SupportTickets { get; set; } = new List<SupportTicket>();



//}