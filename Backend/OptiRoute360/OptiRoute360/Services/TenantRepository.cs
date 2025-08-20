using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data.Entities;
using System.Linq.Expressions;
using System;
using OptiRoute360.Data;

public class TenantRepository : ITenantRepository<TenantManagement>
{
    private readonly ApplicationDbContext _context;

    public TenantRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TenantManagement> GetByIdAsync(Guid id)
    {
        return await _context.TenantManagements
                             .Include(t => t.City)
                             .Include(t => t.Country)
                             .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<IEnumerable<TenantManagement>> GetAllAsync()
    {
        return await _context.TenantManagements.ToListAsync();
    }

    public async Task<bool> ExistsAsync(Expression<Func<TenantManagement, bool>> predicate)
    {
        return await _context.TenantManagements.AnyAsync(predicate);
    }

    public async Task AddAsync(TenantManagement entity)
    {
        await _context.TenantManagements.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TenantManagement entity)
    {
        _context.TenantManagements.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.TenantManagements.FindAsync(id);
        if (entity != null)
        {
            _context.TenantManagements.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
