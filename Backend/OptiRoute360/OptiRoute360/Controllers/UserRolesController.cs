using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data;
using OptiRoute360.Extensions;
using OptiRoute360.Services;

[ApiController]
[Route("api/[controller]")]
public class UserRolesController : ControllerBase
{
    // private readonly ApplicationDbContext _context;
    // public UserRolesController(ApplicationDbContext context)
    //{
    //    _context = context;
    //}
    //private readonly UserRoleService _userRoleService;

    //public UserRolesController(UserRoleService userRoleService)
    //{
    //    _userRoleService = userRoleService;
    //}
    private readonly ApplicationDbContext _context;
    private readonly UserRoleService _userRoleService;

    public UserRolesController(ApplicationDbContext context, UserRoleService userRoleService)
    {
        _context = context;
        _userRoleService = userRoleService;
    }


    [HttpPost("assign")]
    public async Task<IActionResult> AssignRoles([FromBody] AssignRolesDto dto)
    {
        var tenantId = User.GetTenantId(); // From JWT claims
        var currentUserId = User.GetUserId(); // From JWT claims

        await _userRoleService.AssignRolesToUser(
            dto.UserId,
            dto.RoleIds,
            tenantId,
            currentUserId
        );

        return NoContent();
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<List<RoleDto>>> GetUserRoles(Guid userId)
    {

        var tenantId = User.GetTenantId();

        var roles = await _context.UserRoles
            .Where(ur => ur.UserId == userId && ur.TenantId == tenantId)
            .Include(ur => ur.Role)
            .Select(ur => new RoleDto
            {
                Id = ur.Role.Id,
                Name = ur.Role.Name,
                Description = ur.Role.Description
            })
            .ToListAsync();

        return Ok(roles);
    }
}

public class AssignRolesDto
{
    public Guid UserId { get; set; }
    public List<Guid> RoleIds { get; set; }
}

public class RoleDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}