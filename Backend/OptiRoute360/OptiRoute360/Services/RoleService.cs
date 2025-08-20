using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data;
using OptiRoute360.Data.Entities;
using OptiRoute360.Dtos;
using System;

namespace OptiRoute360.Services
{
    public class RoleService : IRoleService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RoleService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Guid> CreateRoleWithEmptyPermissions(RoleCreateDto dto)
        {
            var role = _mapper.Map<Role>(dto);

            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            var allEntities = await _context.SystemEntities.ToListAsync();

            foreach (var entity in allEntities)
            {
                _context.PermissionMatrices.Add(new PermissionMatrix
                {
                    RoleId = role.Id,
                    EntityId = entity.EntityId,
                    EntityName = entity.EntityName,
                    Read = false,
                    Create = false,
                    Update = false,
                    Delete = false
                });
            }

            await _context.SaveChangesAsync();
            return role.Id;
        }

        public async Task<RoleResponseDto> GetRoleById(Guid id)
        {
            var role = await _context.Roles.FindAsync(id);
            return _mapper.Map<RoleResponseDto>(role);
        }

        public async Task<RoleWithPermissionsDto> GetRoleWithPermissions(Guid id)
        {
            var role = await _context.Roles
                .Include(r => r.Permissions)
                .FirstOrDefaultAsync(r => r.Id == id);

            return _mapper.Map<RoleWithPermissionsDto>(role);
        }

        public async Task<List<RoleResponseDto>> GetAllRoles()
        {
            var roles = await _context.Roles.ToListAsync();
            return _mapper.Map<List<RoleResponseDto>>(roles);
        }

        public async Task<bool> DeleteRole(Guid id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return false;

            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}