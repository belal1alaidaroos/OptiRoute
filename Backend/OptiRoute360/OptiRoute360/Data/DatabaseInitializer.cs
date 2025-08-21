using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OptiRoute360.Data.Entities;

namespace OptiRoute360.Data
{
    public class DatabaseInitializer
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
                await _context.Database.MigrateAsync();

                // Seed default tenant and admin
                if (!await _context.TenantManagements.AnyAsync())
                {
                    _logger.LogInformation("Seeding default tenant and admin user...");

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

                    if (!await _roleManager.RoleExistsAsync("Admin"))
                    {
                        await _roleManager.CreateAsync(new IdentityRole<Guid>("Admin"));
                    }

                    var adminUser = new User
                    {
                        Id = Guid.NewGuid(),
                        TenantId = defaultTenant.Id,
                        Email = "admin@smasco.com",
                        UserName = "System Administrator",
                        IsActive = true,
                        EmailConfirmed = true,
                        SecurityStamp = Guid.NewGuid().ToString(),
                        CreatedAt = DateTime.UtcNow
                    };

                    var result = await _userManager.CreateAsync(adminUser, "Admin@123");
                    if (!result.Succeeded)
                    {
                        throw new Exception($"Admin user creation failed: {string.Join(", ", result.Errors)}");
                    }

                    await _userManager.AddToRoleAsync(adminUser, "Admin");
                }

                var tenantIdValue = await _context.TenantManagements.Select(t => t.Id).FirstAsync();

                // Seed OptionSets (global defaults and tenant-level)
                if (!await _context.OptionSetValues.AnyAsync())
                {
                    _logger.LogInformation("Seeding option sets...");
                    await _context.OptionSetValues.AddRangeAsync(new[]
                    {
                        // Status (global)
                        new OptionSetValue { Id = Guid.NewGuid(), TenantId = tenantIdValue, OptionSetName = "Status", Name = "Active", Code = "ACTIVE", IsGeneral = true, IsActive = true, SortOrder = 1 },
                        new OptionSetValue { Id = Guid.NewGuid(), TenantId = tenantIdValue, OptionSetName = "Status", Name = "Inactive", Code = "INACTIVE", IsGeneral = true, IsActive = true, SortOrder = 2 },

                        // Priority (tenant-level)
                        new OptionSetValue { Id = Guid.NewGuid(), TenantId = tenantIdValue, OptionSetName = "Priority", Name = "High", Code = "HIGH", IsGeneral = false, IsActive = true, SortOrder = 1 },
                        new OptionSetValue { Id = Guid.NewGuid(), TenantId = tenantIdValue, OptionSetName = "Priority", Name = "Medium", Code = "MEDIUM", IsGeneral = false, IsActive = true, SortOrder = 2 },
                        new OptionSetValue { Id = Guid.NewGuid(), TenantId = tenantIdValue, OptionSetName = "Priority", Name = "Low", Code = "LOW", IsGeneral = false, IsActive = true, SortOrder = 3 },
                    });
                    await _context.SaveChangesAsync();
                }

                // Seed License Types
                if (!await _context.LicenseTypes.AnyAsync())
                {
                    await _context.LicenseTypes.AddRangeAsync(new[]
                    {
                        new LicenseType { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "Light Vehicle", Code = "LV" },
                        new LicenseType { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "Heavy Vehicle", Code = "HV" },
                        new LicenseType { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "Motorcycle", Code = "MC" },
                        new LicenseType { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "Public Transport", Code = "PT" }
                    });
                    await _context.SaveChangesAsync();
                }

                // Seed Vehicle Types
                if (!await _context.VehicleTypes.AnyAsync())
                {
                    await _context.VehicleTypes.AddRangeAsync(new[]
                    {
                        new VehicleType { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "Sedan" },
                        new VehicleType { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "SUV" },
                        new VehicleType { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "Truck" },
                        new VehicleType { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "Van" },
                        new VehicleType { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "Motorcycle" }
                    });
                    await _context.SaveChangesAsync();
                }

                // Seed Periods
                if (!await _context.Periods.AnyAsync())
                {
                    await _context.Periods.AddRangeAsync(new[]
                    {
                        new Period { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "AM", Code = "AM" },
                        new Period { Id = Guid.NewGuid(), TenantId = tenantIdValue, Name = "PM", Code = "PM" }
                    });
                    await _context.SaveChangesAsync();
                }

                // Seed Countries/Regions/Cities/Hubs/Driver/Vehicle/Workshop
                if (!await _context.Hubs.AnyAsync())
                {
                    // Country
                    var saId = Guid.NewGuid();
                    await _context.Countries.AddAsync(new Country
                    {
                        Id = saId,
                        TenantId = tenantIdValue,
                        Name = "Saudi Arabia",
                        Code = "SA",
                        Status = "Active",
                        Currency = "SAR",
                        Timezone = "+03:00"
                    });
                    await _context.SaveChangesAsync();

                    // Region
                    var riyadhRegionId = Guid.NewGuid();
                    await _context.Regions.AddAsync(new Region
                    {
                        Id = riyadhRegionId,
                        TenantId = tenantIdValue,
                        Name = "Riyadh",
                        CountryId = saId,
                        Status = "Active"
                    });
                    await _context.SaveChangesAsync();

                    // City
                    var riyadhCityId = Guid.NewGuid();
                    await _context.Cities.AddAsync(new City
                    {
                        Id = riyadhCityId,
                        TenantId = tenantIdValue,
                        Name = "Riyadh",
                        RegionId = riyadhRegionId,
                        CountryId = saId,
                        Status = "Active"
                    });
                    await _context.SaveChangesAsync();

                    // Hub
                    var hubId = Guid.NewGuid();
                    await _context.Hubs.AddAsync(new Hub
                    {
                        Id = hubId,
                        TenantId = tenantIdValue,
                        Name = "Riyadh Main Hub",
                        HubCode = "RYD",
                        CityId = riyadhCityId,
                        Latitude = 24.7136m,
                        Longitude = 46.6753m
                    });
                    await _context.SaveChangesAsync();

                    // Driver
                    var lightLicenseTypeId = await _context.LicenseTypes.Where(l => l.Code == "LV").Select(l => l.Id).FirstAsync();
                    var truckTypeId = await _context.VehicleTypes.Where(v => v.Name == "Truck").Select(v => v.Id).FirstAsync();
                    var driverId = Guid.NewGuid();
                    await _context.Drivers.AddAsync(new Driver
                    {
                        Id = driverId,
                        TenantId = tenantIdValue,
                        Name = "Ahmed Al-Rashid",
                        Email = "ahmed@optiroute.com",
                        Phone = "+966501234567",
                        License = "DL123456",
                        LicenseTypeId = lightLicenseTypeId,
                        VehicleTypeId = truckTypeId,
                        HubId = hubId,
                        Status = "Active",
                        Trips = 0,
                        Rating = 0,
                        JoinDate = DateTime.UtcNow
                    });
                    await _context.SaveChangesAsync();

                    // Vehicle Make/Model
                    var makeId = Guid.NewGuid();
                    await _context.VehicleMakes.AddAsync(new VehicleMake { Id = makeId, TenantId = tenantIdValue, Name = "Mercedes" });
                    var modelId = Guid.NewGuid();
                    await _context.VehicleModels.AddAsync(new VehicleModel { Id = modelId, TenantId = tenantIdValue, MakeId = makeId, Name = "Actros" });
                    await _context.SaveChangesAsync();

                    // Vehicle
                    await _context.Vehicles.AddAsync(new Vehicle
                    {
                        Id = Guid.NewGuid(),
                        TenantId = tenantIdValue,
                        PlateNumber = "ABC-123",
                        PlateChar = "",
                        MakeId = makeId,
                        ModelId = modelId,
                        Year = DateTime.UtcNow.Year,
                        Type = "Truck",
                        Capacity = 25000,
                        FuelType = "Diesel",
                        Status = "Active",
                        HubId = hubId,
                        DriverId = driverId,
                        FuelLevel = 80,
                        Mileage = 45230,
                        Location = "Riyadh Depot",
                        LastMaintenanceDate = DateTime.UtcNow.AddMonths(-1),
                        NextMaintenanceDate = DateTime.UtcNow.AddMonths(5),
                        InsuranceExpiry = DateTime.UtcNow.AddMonths(6),
                        RegistrationExpiry = DateTime.UtcNow.AddYears(1),
                        Notes = "Seed vehicle"
                    });
                    await _context.SaveChangesAsync();

                    // Workshop
                    await _context.Workshops.AddAsync(new Workshop
                    {
                        Id = Guid.NewGuid(),
                        TenantId = tenantIdValue,
                        Name = "Al-Riyadh Auto Service",
                        CityId = riyadhCityId,
                        Phone = "+966112345678",
                        Specialties = "Engine Repair, Transmission, Electrical",
                        Rating = 5,
                        Status = "Active",
                        Capacity = 15,
                        CurrentJobs = 3,
                        Latitude = 24.7136m,
                        Longitude = 46.6753m,
                        Type = "Maintenance"
                    });
                    await _context.SaveChangesAsync();
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

