using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptiRoute360.Data.Entities
{
    public class Role : BaseEntity
    {
        [Required, MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string AlternativeName { get; set; }

        public bool IsSystemRole { get; set; } = false;

        [MaxLength(500)]
        public string Description { get; set; }

        public ICollection<PermissionMatrix> Permissions { get; set; }
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

    }
}