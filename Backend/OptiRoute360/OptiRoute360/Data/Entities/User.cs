using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace OptiRoute360.Data.Entities
{
    public class User : IdentityUser<Guid>
    {
        // Account/Security
        public string Salt { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime LastLogin { get; set; }

        // Organizational
        public string Department { get; set; }
        public DateTime JoinDate { get; set; }
        public Guid TenantId { get; set; }

        // Audit
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool? IsDeleted { get; set; } = false;

        // Navigation
        public virtual UserProfile Profile { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
        public virtual AppearanceSettings AppearanceSettings { get; set; }
        public NotificationSettings NotificationSettings { get; set; }

    }
}