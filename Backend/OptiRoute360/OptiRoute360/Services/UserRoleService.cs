using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data;
using OptiRoute360.Data.Entities;

namespace OptiRoute360.Services
{
    public class UserRoleService
    {
        private readonly ApplicationDbContext _context;

        public UserRoleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AssignRolesToUser(Guid userId, List<Guid> roleIds, Guid tenantId, Guid currentUserId)
        {
            // Verify user exists and belongs to the same tenant
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId && u.TenantId == tenantId);

            if (user == null) throw new ArgumentException("User not found");

            // Get valid roles that exist and belong to the same tenant
            var validRoles = await _context.Roles
                .Where(r => roleIds.Contains(r.Id))
                .Where(r => r.TenantId == tenantId)
                .ToListAsync();
             

            // Remove existing roles not in the new list
            var existingRoles = await _context.UserRoles
                .Where(ur => ur.UserId == userId && ur.TenantId == tenantId)
                .ToListAsync();

            _context.UserRoles.RemoveRange(
                existingRoles.Where(er => !roleIds.Contains(er.RoleId))
            );

            // Add new roles
            foreach (var roleId in roleIds)
            {
                if (!existingRoles.Any(er => er.RoleId == roleId))
                {
                    _context.UserRoles.Add(new UserRole
                    {
                        UserId = userId,
                        RoleId = roleId,
                        TenantId = tenantId,
                        CreatedBy = currentUserId,
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
