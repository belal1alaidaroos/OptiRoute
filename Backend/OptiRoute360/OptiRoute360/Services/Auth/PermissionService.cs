using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data;
using OptiRoute360.Data.Entities;
using OptiRoute360.Dtos;

namespace OptiRoute360.Services.Auth
{
    public class PermissionService : IPermissionService
    {
        private readonly ApplicationDbContext _context;

        public PermissionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Dictionary<string, EntityPermissions>> GetMergedPermissions(Guid userId)
        {
            var userRoles = await _context.UserRoles
                .Include(ur => ur.Role)
                .ThenInclude(r => r.Permissions)
                .Where(ur => ur.UserId == userId)
                .ToListAsync();

            var mergedPermissions = new Dictionary<string, EntityPermissions>();

            foreach (var userRole in userRoles)
            {
                foreach (var permission in userRole.Role.Permissions)
                {
                    if (!mergedPermissions.ContainsKey(permission.EntityName))
                    {
                        mergedPermissions[permission.EntityName] = new EntityPermissions();
                    }

                    var merged = mergedPermissions[permission.EntityName];
                    merged.Read = merged.Read || (permission.Read ?? false);
                    merged.Create = merged.Create || (permission.Create ?? false);
                    merged.Update = merged.Update || (permission.Update ?? false);
                    merged.Delete = merged.Delete || (permission.Delete ?? false);
                }
            }

            return mergedPermissions;
        }
      
         
        public async Task UpdateRolePermissions(Guid roleId, List<PermissionUpdateDto> permissions)
        {
            foreach (var perm in permissions)
            {
                var existing = await _context.PermissionMatrices
                    .FirstOrDefaultAsync(p => p.RoleId == roleId && p.EntityName == perm.EntityName);

                if (existing == null)
                {
                    existing = new PermissionMatrix
                    {
                        RoleId = roleId,
                        EntityName = perm.EntityName
                    };
                    _context.PermissionMatrices.Add(existing);
                }

                existing.Read = perm.Read;
                existing.Create = perm.Create;
                existing.Update = perm.Update;
                existing.Delete = perm.Delete;
            }
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSinglePermission(PermissionUpdateDto dto)
        {
            var existing = await _context.PermissionMatrices
                .FirstOrDefaultAsync(p => p.RoleId == dto.RoleId && p.EntityName == dto.EntityName);

            if (existing == null)
            {
                existing = new PermissionMatrix
                {
                    RoleId = dto.RoleId,
                    EntityName = dto.EntityName
                };
                _context.PermissionMatrices.Add(existing);
            }

            existing.Read = dto.Read;
            existing.Create = dto.Create;
            existing.Update = dto.Update;
            existing.Delete = dto.Delete;

            await _context.SaveChangesAsync();
        }

        public async Task<List<PermissionMatrixDto>> GetPermissionsByRole(Guid roleId)
        {
            return await _context.PermissionMatrices
                .Where(p => p.RoleId == roleId)
                .Select(p => new PermissionMatrixDto
                {
                    RoleId = p.RoleId,
                    EntityName = p.EntityName,
                    Read = p.Read ?? false,
                    Create = p.Create ?? false,
                    Update = p.Update ?? false,
                    Delete = p.Delete ?? false
                })
                .ToListAsync();
        }

        public async Task<bool> CheckPermission(Guid roleId, string entityName, string action)
        {
            var permission = await _context.PermissionMatrices
                .FirstOrDefaultAsync(p => p.RoleId == roleId && p.EntityName == entityName);

            if (permission == null) return false;

            switch (action.ToLower())
            {
                case "read": return permission.Read ?? false;
                case "create": return permission.Create ?? false;
                case "update": return permission.Update ?? false;
                case "delete": return permission.Delete ?? false;
                default: return false;
            }
        }
    }

    public class EntityPermissions
    {
        public bool Read { get; set; }
        public bool Create { get; set; }
        public bool Update { get; set; }
        public bool Delete { get; set; }
    }
}