using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data;
using System;

namespace OptiRoute360.Services.User
{
    public interface IAppearanceService
    {
        Task<AppearanceSettings> GetUserAppearance(Guid userId);
    }

    public class AppearanceService : IAppearanceService
    {
        private readonly ApplicationDbContext _context;

        public AppearanceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AppearanceSettings> GetUserAppearance(Guid userId)
        {
            return await _context.AppearanceSettings
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.UserId == userId);
        }
    }
}