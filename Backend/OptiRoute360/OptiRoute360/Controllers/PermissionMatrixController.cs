using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Dtos;
using OptiRoute360.Services.Auth;

namespace OptiRoute360.Controllers
{
    [ApiController]
    [Route("api/permissions")]
    public class PermissionMatrixController : ControllerBase
    {
        private readonly IPermissionService _permissionService;

        public PermissionMatrixController(IPermissionService permissionService)
        {
            _permissionService = permissionService;
        }

        [HttpPut("bulk-update")]
        public async Task<IActionResult> BulkUpdatePermissions(BulkPermissionsUpdateDto dto)
        {
            await _permissionService.UpdateRolePermissions(dto.RoleId, dto.Permissions);
            return NoContent();
        }

        [HttpPut("single-update")]
        public async Task<IActionResult> UpdateSinglePermission(PermissionUpdateDto dto)
        {
            await _permissionService.UpdateSinglePermission(dto);
            return NoContent();
        }

        [HttpGet("role/{roleId}")]
        public async Task<ActionResult<List<PermissionMatrixDto>>> GetPermissionsByRole(Guid roleId)
        {
            var permissions = await _permissionService.GetPermissionsByRole(roleId);
            return Ok(permissions);
        }

        [HttpGet("check")]
        public async Task<ActionResult<bool>> CheckPermission(
            [FromQuery] Guid roleId,
            [FromQuery] string entityId,
            [FromQuery] string action)
        {
            var hasPermission = await _permissionService.CheckPermission(roleId, entityId, action);
            return Ok(hasPermission);
        }
    }
}