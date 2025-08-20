using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data.Entities;
using OptiRoute360.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OptiRoute360.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _dbSet;
        private readonly ICurrentUserService _currentUserService;

        public Repository(ApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _dbSet = context.Set<T>();
            _currentUserService = currentUserService;
        }

        public async Task<T> GetByIdAsync(Guid id, string[] includes = null)
        {
            var query = _dbSet.AsQueryable()
                .Where(e => e.Id == id && !e.IsDeleted.GetValueOrDefault());

            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            return await query.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.Where(e => !e.IsDeleted.GetValueOrDefault()).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAsync(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string[] includes = null,
            int? skip = null,
            int? take = null)
        {
            IQueryable<T> query = _dbSet.Where(e => !e.IsDeleted.GetValueOrDefault());

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (skip.HasValue)
            {
                query = query.Skip(skip.Value);
            }

            if (take.HasValue)
            {
                query = query.Take(take.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.AnyAsync(predicate);
        }

        public async Task<int> CountAsync(Expression<Func<T, bool>> predicate = null)
        {
            return predicate == null
                ? await _dbSet.CountAsync()
                : await _dbSet.CountAsync(predicate);
        }

        public async Task AddAsync(T entity)
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.CreatedBy = _currentUserService.UserId;
            entity.TenantId = _currentUserService.TenantId;

            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            entity.ModifiedAt = DateTime.UtcNow;
            entity.ModifiedBy = _currentUserService.UserId;

            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            entity.IsDeleted = true;
            entity.DeletedAt = DateTime.UtcNow;
            entity.DeletedBy = _currentUserService.UserId;

            await UpdateAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                await DeleteAsync(entity);
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet
                .Where(e => !e.IsDeleted.GetValueOrDefault())
                .Where(predicate)
                .ToListAsync();
        }


        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await GetAsync(predicate);
        }

    }
}