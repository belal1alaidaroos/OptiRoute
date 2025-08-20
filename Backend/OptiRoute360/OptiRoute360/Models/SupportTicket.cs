using OptiRoute360.Data.Entities;

public class SupportTicket : BaseEntity
{
    public string TicketNumber { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Priority { get; set; }
    public int Status { get; set; }
    public int Category { get; set; }
    public Guid SubmittedById { get; set; }
    public Guid AssignedToId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int Responses { get; set; }
    public Guid TenantId { get; set; }

    // Navigation properties
    public User SubmittedBy { get; set; }
    public User AssignedTo { get; set; }
    public TenantManagement Tenant { get; set; }
   

}