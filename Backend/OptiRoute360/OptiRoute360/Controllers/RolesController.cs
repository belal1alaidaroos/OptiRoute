using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Dtos;
using OptiRoute360.Services;

namespace OptiRoute360.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RolesController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole(RoleCreateDto dto)
        {
            var roleId = await _roleService.CreateRoleWithEmptyPermissions(dto);
            return CreatedAtAction(nameof(GetRole), new { id = roleId }, new { Id = roleId });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoleResponseDto>> GetRole(Guid id)
        {
            var role = await _roleService.GetRoleById(id);
            return Ok(role);
        }

        [HttpGet("{id}/permissions")]
        public async Task<ActionResult<RoleWithPermissionsDto>> GetRoleWithPermissions(Guid id)
        {
            var result = await _roleService.GetRoleWithPermissions(id);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<List<RoleResponseDto>>> GetAllRoles()
        {
            var roles = await _roleService.GetAllRoles();
            return Ok(roles);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(Guid id)
        {
            var success = await _roleService.DeleteRole(id);
            return success ? NoContent() : NotFound();
        }
    }
}