using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data.Entities;


namespace OptiRoute360.Data
{
    public class DatabaseInitializer // Changed from static to regular class
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<DatabaseInitializer> _logger;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;

        public DatabaseInitializer(
            ApplicationDbContext context,
            IConfiguration configuration,
            ILogger<DatabaseInitializer> logger,
            UserManager<User> userManager,
            RoleManager<IdentityRole<Guid>> roleManager)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Initialize()
        {
            try
            {
                // Apply pending migrations
                _logger.LogInformation("Applying database migrations...");
              //To be checked
              //await _context.Database.MigrateAsync();

                // Seed default tenant if none exists
                if (!await _context.TenantManagements.AnyAsync())
                {
                    _logger.LogInformation("Seeding default tenant and admin user...");

                    // Create default tenant
                    var defaultTenant = new TenantManagement
                    {
                        Id = Guid.NewGuid(),
                        CompanyName = "Default Tenant",
                        Email = "admin@default.com",
                        Status = "Active",
                        SubscriptionPlan = "Premium",
                        MaxUsers = 100,
                        MaxVehicles = 500,
                        IsDefault = true,
                        CreatedAt = DateTime.UtcNow
                    };

                    await _context.TenantManagements.AddAsync(defaultTenant);
                    await _context.SaveChangesAsync();

                    // Ensure Admin role exists
                    if (!await _roleManager.RoleExistsAsync("Admin"))
                    {
                        await _roleManager.CreateAsync(new IdentityRole<Guid>("Admin"));
                    }

                    // Create admin user
                    var adminUser = new User
                    {
                        Id = Guid.NewGuid(),
                        TenantId = defaultTenant.Id,
                        //FirstName = "Bilal", // Changed from Name to UserName
                        //LastName = "Alaidaroos", // Changed from Name to UserName
                        Email = "admin@smasco.com",
                        UserName = "System Administrator",
                        IsActive = true,
                        EmailConfirmed = true, // Recommended for initial admin
                        SecurityStamp = Guid.NewGuid().ToString(), // Required by Identity
                        CreatedAt = DateTime.UtcNow
                    };

                    // Create user with password
                    var result = await _userManager.CreateAsync(adminUser, "Admin@123");
                    if (!result.Succeeded)
                    {
                        throw new Exception($"Admin user creation failed: {string.Join(", ", result.Errors)}");
                    }

                    // Assign admin role
                    await _userManager.AddToRoleAsync(adminUser, "Admin");

                    _logger.LogInformation("Default tenant and admin user created successfully");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while initializing the database");
                throw;
            }
        }
    }
}