using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data.Entities;
using OptiRoute360.Data.Interfaces;
using System.Linq.Expressions;

namespace OptiRoute360.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task DeleteAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
        public async Task<User> GetByIdAsync(Guid id)
        {
            var user = await _context.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted.GetValueOrDefault());

            if (user != null)
            {
                user.AppearanceSettings = await _context.AppearanceSettings
                    .FirstOrDefaultAsync(a => a.UserId == user.Id);
            }

            return user;
        }


        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users
                .Include(u => u.UserRoles)
                .Where(u => !u.IsDeleted.GetValueOrDefault())
                .ToListAsync();
        }

        //public async Task<User> GetWithRelatedDataAsync(Guid id)
        //{
        //    return await _context.Users
        //        .Include(u => u.ManagedHubs)
        //        .Include(u => u.SupervisedHubs)
        //        .Include(u => u.AssignedTickets)
        //        .Include(u => u.UploadedAttachments)
        //        .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted.GetValueOrDefault());
        //}

        public async Task<bool> ExistsAsync(Expression<Func<User, bool>> predicate)
        {
            return await _context.Users
                .AnyAsync(predicate);
        }

        public async Task<IEnumerable<User>> GetUsersByTenantAsync(Guid tenantId)
        {
            return await _context.Users
                .Where(u => u.TenantId == tenantId && !u.IsDeleted.GetValueOrDefault())
                .ToListAsync();
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Email == email && !u.IsDeleted.GetValueOrDefault());
        }

        public async Task<IEnumerable<User>> GetUsersByRoleAsync(string roleName)
        {
            return await _context.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .Where(u => u.UserRoles.Any(ur => ur.Role.Name == roleName) &&
                       !u.IsDeleted.GetValueOrDefault())
                .ToListAsync();
        }

        public async Task AddAsync(User user)
        {
            user.CreatedAt = DateTime.UtcNow;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            user.UpdatedAt = DateTime.UtcNow;
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var user = await GetByIdAsync(id);
            if (user != null)
            {
                user.IsDeleted = true;
                user.UpdatedAt = DateTime.UtcNow;
                await UpdateAsync(user);
            }
        }
    }
}