using System.ComponentModel.DataAnnotations;

namespace OptiRoute360.Dtos
{
    public class PermissionMatrixDto
    {
        public Guid RoleId { get; set; }
        public Guid EntityId { get; set; }
        public string EntityName { get; set; }
        public bool Read { get; set; }
        public bool Create { get; set; }
        public bool Update { get; set; }
        public bool Delete { get; set; }
    }

    public class PermissionUpdateDto
    {
        [Required]
        public Guid EntityId { get; set; }
        [Required]
        public Guid RoleId { get; set; }
        public string EntityName { get; set; }

        public bool Read { get; set; }
        public bool Create { get; set; }
        public bool Update { get; set; }
        public bool Delete { get; set; }
    }

    public class BulkPermissionsUpdateDto
    {
        [Required]
        public Guid RoleId { get; set; }
        [Required]
        public List<PermissionUpdateDto> Permissions { get; set; }
    }
}