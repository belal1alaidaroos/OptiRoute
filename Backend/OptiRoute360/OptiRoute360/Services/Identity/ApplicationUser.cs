// In Models/Identity/ApplicationUser.cs
using Microsoft.AspNetCore.Identity;

namespace OptiRoute360.Models.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Department { get; set; }
        public DateTime JoinDate { get; set; }
        public DateTime LastLogin { get; set; }
        public string Avatar { get; set; }
        public bool IsActive { get; set; }
        public Guid TenantId { get; set; }
    }
}