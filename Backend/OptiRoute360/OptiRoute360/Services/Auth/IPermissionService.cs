using OptiRoute360.Dtos;

namespace OptiRoute360.Services.Auth
{
    public interface IPermissionService
    {

        Task UpdateRolePermissions(Guid roleId, List<PermissionUpdateDto> permissions);
        Task UpdateSinglePermission(PermissionUpdateDto dto);
        Task<List<PermissionMatrixDto>> GetPermissionsByRole(Guid roleId);
        Task<bool> CheckPermission(Guid roleId, string entityId, string action);
        Task<Dictionary<string, EntityPermissions>> GetMergedPermissions(Guid userId);

    }
     
}