using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OptiRoute360.Data.Entities
{
    public class PermissionMatrix : BaseEntity
    {
        [ForeignKey(nameof(Role))]
        public Guid RoleId { get; set; }

        [Required, MaxLength(100)]
        public Guid EntityId { get; set; } // مثل "Users", "Products"

        [MaxLength(100)]
        public string EntityName { get; set; } // اسم معروض

        public bool? Read { get; set; } = false;
        public bool? Create { get; set; } = false;
        public bool? Update { get; set; } = false;
        public bool? Delete { get; set; } = false;

        public Role Role { get; set; }
    }
}