using OptiRoute360.Dtos;

namespace OptiRoute360.Services
{
    public interface IRoleService
    {
        Task<Guid> CreateRoleWithEmptyPermissions(RoleCreateDto dto);
        Task<RoleResponseDto> GetRoleById(Guid id);
        Task<RoleWithPermissionsDto> GetRoleWithPermissions(Guid id);
        Task<List<RoleResponseDto>> GetAllRoles();
        Task<bool> DeleteRole(Guid id);
    }
}