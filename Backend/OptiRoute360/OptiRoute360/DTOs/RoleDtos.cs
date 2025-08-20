using System.ComponentModel.DataAnnotations;

namespace OptiRoute360.Dtos
{
    public class RoleCreateDto
    {
        [Required]
        public string Name { get; set; }
        public string AlternativeName { get; set; }
        public string Description { get; set; }
        public bool IsSystemRole { get; set; } = false;
    }

    public class RoleResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string AlternativeName { get; set; }
        public string Description { get; set; }
        public bool IsSystemRole { get; set; }
    }

    public class RoleWithPermissionsDto : RoleResponseDto
    {
        public List<PermissionMatrixDto> Permissions { get; set; }
    }
}