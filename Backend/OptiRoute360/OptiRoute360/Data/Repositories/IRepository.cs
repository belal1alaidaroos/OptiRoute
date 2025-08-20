using OptiRoute360.Data.Entities;
using System.Linq.Expressions;


namespace OptiRoute360.Data.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);

        Task<T> GetByIdAsync(Guid id, string[] includes = null);
        Task<IEnumerable<T>> GetAllAsync();
        Task SaveChangesAsync();
        Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> predicate);

        Task<IEnumerable<T>> GetAsync(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string[] includes = null,
            int? skip = null,
            int? take = null);
        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
        Task<int> CountAsync(Expression<Func<T, bool>> predicate = null);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task DeleteAsync(Guid id);
    }

}
