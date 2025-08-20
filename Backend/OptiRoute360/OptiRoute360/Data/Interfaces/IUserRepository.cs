using OptiRoute360.Data.Entities;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OptiRoute360.Data.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(Guid id);
        Task<IEnumerable<User>> GetAllAsync();  
        Task<User> GetByEmailAsync(string email);
        Task<bool> EmailExistsAsync(string email);  
        Task<IEnumerable<User>> GetUsersByRoleAsync(string roleName);
        Task<bool> ExistsAsync(Expression<Func<User, bool>> predicate);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(Guid id);
        Task DeleteAsync(User user);  

    }
}