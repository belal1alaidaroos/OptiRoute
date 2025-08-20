// 35. SupportTickets DTOs
using System.ComponentModel.DataAnnotations;

public class AssignTicketDto {
    [Required] public Guid AssigneeId { get; set; }
}