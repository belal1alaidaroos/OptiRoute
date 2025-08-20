using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptiRoute360.Data.Entities
{
    public class UserProfile : BaseEntity
    {
        // Foreign Key
        [Required]
        public Guid UserId { get; set; }

        // Personal Info
        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        [Required, MaxLength(50)]
        public string LastName { get; set; }

        public string AvatarUrl { get; set; }
        public string Bio { get; set; }
        public DateTime? DateOfBirth { get; set; }

        // Appearance Settings
        public string Theme { get; set; } = "light";
        public string Language { get; set; } = "en-US";
        public int FontSize { get; set; } = 14;

        // Navigation
        public virtual User User { get; set; }

        // Helper
        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";
    }
}