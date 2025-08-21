using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
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

        public DatabaseInitializer(
            ApplicationDbContext context,
            IConfiguration configuration,
            ILogger<DatabaseInitializer> logger,
            UserManager<User> userManager)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
            _userManager = userManager;
        }

        public async Task Initialize()
        {
            try
            {
                _logger.LogInformation("Applying database migrations...");
                await _context.Database.MigrateAsync();

                // Seed everything inside a transaction for consistency
                await using var transaction = await _context.Database.BeginTransactionAsync();

                // 1) Seed Tenant (with circular FK handled via two-phase City/Country update)
                Guid tenantId;
                if (!await _context.TenantManagements.AnyAsync())
                {
                    tenantId = Guid.NewGuid();

                    // Temporarily disable TenantManagement City/Country FKs to allow bootstrap insert
                    await DisableTenantCityCountryConstraints();

                    var tenant = new TenantManagement
                    {
                        Id = tenantId,
                        CreatedAt = DateTime.UtcNow,
                        CreatedBy = Guid.Empty,
                        CompanyName = "OptiRoute 360",
                        CompanyAlternativeName = "OptiRoute",
                        ContactPerson = "System Admin",
                        Email = "admin@optiroute360.local",
                        Phone = "+966-11-000-0000",
                        Address = "King Fahd Rd, Riyadh",
                        CityId = Guid.Empty,     // will set after City is created
                        CountryId = Guid.Empty,  // will set after Country is created
                        Website = "https://optiroute360.local",
                        Industry = "Logistics",
                        SubscriptionPlan = "Premium",
                        Status = "Active",
                        MaxUsers = 500,
                        MaxVehicles = 1000,
                        CurrentUsers = 0,
                        CurrentVehicles = 0,
                        Features = "{\"tracking\":true,\"optimization\":true}",
                        IsDefault = true
                    };
                    _context.TenantManagements.Add(tenant);
                    await _context.SaveChangesAsync();

                    // 2) Seed Country/Region/City now that Tenant exists
                    var countryId = Guid.NewGuid();
                    var regionId = Guid.NewGuid();
                    var cityId = Guid.NewGuid();

                    _context.Countries.Add(new Country
                    {
                        Id = countryId,
                        TenantId = tenantId,
                        CreatedBy = Guid.Empty,
                        CreatedAt = DateTime.UtcNow,
                        Name = "Saudi Arabia",
                        AlternativeName = "KSA",
                        Code = "SA",
                        Status = "Active",
                        Priority = "High",
                        Currency = "SAR",
                        Timezone = "+03:00",
                        Description = "Kingdom of Saudi Arabia"
                    });

                    _context.Regions.Add(new Region
                    {
                        Id = regionId,
                        TenantId = tenantId,
                        CreatedBy = Guid.Empty,
                        CreatedAt = DateTime.UtcNow,
                        Name = "Riyadh Province",
                        CountryId = countryId,
                        Status = "Active",
                        Priority = "High",
                        Timezone = "+03:00",
                        Description = "Central region"
                    });

                    _context.Cities.Add(new City
                    {
                        Id = cityId,
                        TenantId = tenantId,
                        CreatedBy = Guid.Empty,
                        CreatedAt = DateTime.UtcNow,
                        Name = "Riyadh",
                        AlternativeName = "Ar-Riyadh",
                        RegionId = regionId,
                        CountryId = countryId,
                        PostalCode = "11564",
                        Status = "Active",
                        Priority = "High",
                        Timezone = "+03:00",
                        Description = "Capital city"
                    });
                    await _context.SaveChangesAsync();

                    // Update tenant with City and Country and re-enable constraints
                    tenant.CityId = cityId;
                    tenant.CountryId = countryId;
                    _context.TenantManagements.Update(tenant);
                    await _context.SaveChangesAsync();
                    await ReenableTenantCityCountryConstraints();
                }
                else
                {
                    tenantId = await _context.TenantManagements.Select(t => t.Id).FirstAsync();
                }

                // Ensure Country/Region/City exist for the tenant (idempotent if above branch skipped)
                var existingCountryId = await _context.Countries.Where(c => c.TenantId == tenantId && c.Code == "SA").Select(c => c.Id).FirstOrDefaultAsync();
                if (existingCountryId == Guid.Empty)
                {
                    var country = new Country
                    {
                        Id = Guid.NewGuid(),
                        TenantId = tenantId,
                        CreatedBy = Guid.Empty,
                        CreatedAt = DateTime.UtcNow,
                        Name = "Saudi Arabia",
                        AlternativeName = "KSA",
                        Code = "SA",
                        Status = "Active",
                        Priority = "High",
                        Currency = "SAR",
                        Timezone = "+03:00",
                        Description = "Kingdom of Saudi Arabia"
                    };
                    _context.Countries.Add(country);
                    await _context.SaveChangesAsync();
                }

                // 3) Seed Admin role (custom Role table) and Admin user
                var adminRole = await _context.Roles.FirstOrDefaultAsync(r => r.TenantId == tenantId && r.Name == "Admin");
                if (adminRole == null)
                {
                    adminRole = new Role
                    {
                        Id = Guid.NewGuid(),
                        TenantId = tenantId,
                        CreatedAt = DateTime.UtcNow,
                        CreatedBy = Guid.Empty,
                        Name = "Admin",
                        AlternativeName = "Administrator",
                        IsSystemRole = true,
                        Description = "Full system access"
                    };
                    _context.Roles.Add(adminRole);
                    await _context.SaveChangesAsync();
                }

                var adminEmail = _configuration["Seed:AdminEmail"] ?? "admin@optiroute360.local";
                var adminPassword = _configuration["Seed:AdminPassword"] ?? "Admin@123";
                var adminUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == adminEmail);
                if (adminUser == null)
                {
                    adminUser = new User
                    {
                        Id = Guid.NewGuid(),
                        TenantId = tenantId,
                        Email = adminEmail,
                        UserName = adminEmail,
                        EmailConfirmed = true,
                        PhoneNumber = "+966-500000000",
                        PhoneNumberConfirmed = false,
                        IsActive = true,
                        Department = "IT",
                        JoinDate = DateTime.UtcNow.Date,
                        LastLogin = DateTime.UtcNow,
                        Salt = Convert.ToBase64String(Guid.NewGuid().ToByteArray()),
                        SecurityStamp = Guid.NewGuid().ToString(),
                        CreatedAt = DateTime.UtcNow
                    };
                    var createResult = await _userManager.CreateAsync(adminUser, adminPassword);
                    if (!createResult.Succeeded)
                    {
                        throw new Exception($"Failed to create admin user: {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
                    }

                    // Create profile (required fields)
                    var profile = new UserProfile
                    {
                        Id = Guid.NewGuid(),
                        TenantId = tenantId,
                        CreatedAt = DateTime.UtcNow,
                        CreatedBy = adminUser.Id,
                        UserId = adminUser.Id,
                        FirstName = "System",
                        LastName = "Administrator",
                        AvatarUrl = string.Empty,
                        Bio = string.Empty,
                        DateOfBirth = null,
                        Theme = "light",
                        Language = "en-US",
                        FontSize = 14
                    };
                    _context.UserProfiles.Add(profile);
                    await _context.SaveChangesAsync();

                    // Assign Admin role (custom join table)
                    if (!await _context.UserRoles.AnyAsync(ur => ur.UserId == adminUser.Id && ur.RoleId == adminRole.Id && ur.TenantId == tenantId))
                    {
                        _context.UserRoles.Add(new UserRole
                        {
                            Id = Guid.NewGuid(),
                            TenantId = tenantId,
                            CreatedAt = DateTime.UtcNow,
                            CreatedBy = adminUser.Id,
                            UserId = adminUser.Id,
                            RoleId = adminRole.Id
                        });
                        await _context.SaveChangesAsync();
                    }
                }
                
                // Ensure Tenant.CreatedBy is a real user (replace Guid.Empty placeholder)
                var seededTenant = await _context.TenantManagements.FirstAsync();
                if (seededTenant.CreatedBy == Guid.Empty)
                {
                    seededTenant.CreatedBy = adminUser!.Id;
                    _context.TenantManagements.Update(seededTenant);
                    await _context.SaveChangesAsync();
                }

                // 4) Seed reference data: LicenseTypes, VehicleTypes, Periods
                if (!await _context.LicenseTypes.AnyAsync(l => l.TenantId == tenantId))
                {
                    _context.LicenseTypes.AddRange(new[]
                    {
                        new LicenseType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "Light Vehicle", AlternativeName = "LV", Code = "LV", Description = "Cars, small vans" },
                        new LicenseType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "Heavy Vehicle", AlternativeName = "HV", Code = "HV", Description = "Trucks, buses" },
                        new LicenseType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "Motorcycle", AlternativeName = "MC", Code = "MC", Description = "Two-wheelers" },
                        new LicenseType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "Public Transport", AlternativeName = "PT", Code = "PT", Description = "Passenger transport" }
                    });
                    await _context.SaveChangesAsync();
                }

                if (!await _context.VehicleTypes.AnyAsync(v => v.TenantId == tenantId))
                {
                    _context.VehicleTypes.AddRange(new[]
                    {
                        new VehicleType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "Sedan", AlternativeName = "Sedan", Icon = "car", Description = "Passenger car" },
                        new VehicleType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "SUV", AlternativeName = "SUV", Icon = "suv", Description = "Sport utility vehicle" },
                        new VehicleType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "Truck", AlternativeName = "Truck", Icon = "truck", Description = "Heavy duty truck" },
                        new VehicleType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "Van", AlternativeName = "Van", Icon = "van", Description = "Cargo van" },
                        new VehicleType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "Motorcycle", AlternativeName = "Motorcycle", Icon = "bike", Description = "Two-wheeler" }
                    });
                    await _context.SaveChangesAsync();
                }

                if (!await _context.Periods.AnyAsync(p => p.TenantId == tenantId))
                {
                    _context.Periods.AddRange(new[]
                    {
                        new Period { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "AM", AlternativeName = "Morning", Code = "AM", PeriodValue = 1, StartTime = new TimeSpan(6,0,0), EndTime = new TimeSpan(12,0,0) },
                        new Period { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty, Name = "PM", AlternativeName = "Evening", Code = "PM", PeriodValue = 2, StartTime = new TimeSpan(12,0,0), EndTime = new TimeSpan(18,0,0) }
                    });
                    await _context.SaveChangesAsync();
                }

                // 5) Ensure City/Region exist and create Hub + Zone
                var country = await _context.Countries.FirstAsync(c => c.TenantId == tenantId && c.Code == "SA");
                var region = await _context.Regions.FirstOrDefaultAsync(r => r.TenantId == tenantId && r.CountryId == country.Id);
                if (region == null)
                {
                    region = new Region
                    {
                        Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty,
                        Name = "Riyadh Province", CountryId = country.Id, Status = "Active", Priority = "High", Timezone = "+03:00", Description = "Central region"
                    };
                    _context.Regions.Add(region);
                    await _context.SaveChangesAsync();
                }

                var city = await _context.Cities.FirstOrDefaultAsync(c => c.TenantId == tenantId && c.Name == "Riyadh");
                if (city == null)
                {
                    city = new City
                    {
                        Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty,
                        Name = "Riyadh", AlternativeName = "Ar-Riyadh", RegionId = region.Id, CountryId = country.Id,
                        PostalCode = "11564", Status = "Active", Priority = "High", Timezone = "+03:00", Description = "Capital city"
                    };
                    _context.Cities.Add(city);
                    await _context.SaveChangesAsync();
                }

                var zone = await _context.GeoZones.FirstOrDefaultAsync(z => z.TenantId == tenantId && z.CityId == city.Id && z.Name == "Central Zone");
                if (zone == null)
                {
                    zone = new GeoZone
                    {
                        Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser?.Id ?? Guid.Empty,
                        Name = "Central Zone", AlternativeName = "Central", CityId = city.Id, Description = "Central coverage", Status = "Active"
                    };
                    _context.GeoZones.Add(zone);
                    await _context.SaveChangesAsync();
                }

                if (!await _context.Hubs.AnyAsync(h => h.TenantId == tenantId))
                {
                    await DisableHubNearestWarehouseConstraint();
                    var hubId = Guid.NewGuid();
                    var now = DateTime.UtcNow;
                    var hub = new Hub
                    {
                        Id = hubId,
                        TenantId = tenantId,
                        CreatedAt = now,
                        CreatedBy = adminUser?.Id ?? Guid.Empty,
                        Name = "Riyadh Main Hub",
                        AlternativeName = "Main Hub",
                        CityId = city.Id,
                        ManagerId = adminUser!.Id,
                        SupervisorId = adminUser!.Id,
                        Longitude = 46.6753m,
                        Latitude = 24.7136m,
                        VehiclesCapacity = 200,
                        DriversCapacity = 300,
                        ShipmentsType = "General",
                        LandLine = "+966-11-123-4567",
                        Mobile = "+966-50-123-4567",
                        WorkingFrom = new TimeSpan(8,0,0),
                        ClosedOn = new TimeSpan(18,0,0),
                        Status = "Active",
                        Address = "King Fahd Rd, Riyadh",
                        ZoneId = zone.Id,
                        CoverageRadius = 25.5m,
                        NearestWarehouseId = hubId, // set self-reference while FK is disabled
                        AccessibilityNotes = "Easy truck access",
                        HubCode = "RYD-MAIN",
                        OperationalSince = now.AddYears(-2),
                        TimeZone = "+03:00",
                        Is24By7 = false,
                        ServiceLevelAgreement = "Standard SLA",
                        StorageCapacity = 10000,
                        ActiveVehiclesCount = 0,
                        ActiveDriversCount = 0,
                        FuelStorageCapacity = 50000m,
                        SpecialEquipment = "Forklifts",
                        EmergencyContact = "+966-11-000-0000",
                        ComplianceCertificates = "ISO9001",
                        InsurancePolicyNumber = "POL-123456",
                        HasAutomatedSorting = true,
                        IntegratedSystems = "WMS,TMS",
                        LastSystemSync = now,
                        OperatingCostPerMonth = 250000m,
                        RevenuePerMonth = 400000m,
                        BudgetCode = "HUB-RYD-001"
                    };
                    _context.Hubs.Add(hub);
                    await _context.SaveChangesAsync();
                    await ReenableHubNearestWarehouseConstraint();
                }

                // 6) Seed Driver
                if (!await _context.Drivers.AnyAsync(d => d.TenantId == tenantId))
                {
                    var licenseTypeId = await _context.LicenseTypes.Where(l => l.TenantId == tenantId && l.Code == "LV").Select(l => l.Id).FirstAsync();
                    var vehicleTypeId = await _context.VehicleTypes.Where(v => v.TenantId == tenantId && v.Name == "Truck").Select(v => v.Id).FirstAsync();
                    var hubId = await _context.Hubs.Where(h => h.TenantId == tenantId).Select(h => h.Id).FirstAsync();
                    _context.Drivers.Add(new Driver
                    {
                        Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id,
                        Name = "Ahmed Al-Rashid", AlternativeName = "Ahmed R.", Email = "ahmed@optiroute360.local", Phone = "+966-50-111-2222",
                        License = "DL123456",
                        LicenseTypeId = licenseTypeId,
                        VehicleTypeId = vehicleTypeId,
                        HubId = hubId,
                        Status = "Active",
                        Trips = 0,
                        Rating = 4.8m,
                        JoinDate = DateTime.UtcNow.AddMonths(-6),
                        Address = "Riyadh, Saudi Arabia",
                        LicenseExpiry = DateTime.UtcNow.AddYears(3)
                    });
                    await _context.SaveChangesAsync();
                }

                // 7) Vehicle Make/Model + Vehicle
                if (!await _context.VehicleMakes.AnyAsync(m => m.TenantId == tenantId))
                {
                    var makeId = Guid.NewGuid();
                    _context.VehicleMakes.Add(new VehicleMake
                    {
                        Id = makeId, TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id,
                        Name = "Mercedes", AlternativeName = "Mercedes-Benz", Country = "Germany", Popular = true
                    });
                    await _context.SaveChangesAsync();

                    var truckTypeId = await _context.VehicleTypes.Where(v => v.TenantId == tenantId && v.Name == "Truck").Select(v => v.Id).FirstAsync();
                    var modelId = Guid.NewGuid();
                    _context.VehicleModels.Add(new VehicleModel
                    {
                        Id = modelId, TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id,
                        Name = "Actros", AlternativeName = "Actros",
                        MakeId = makeId, TypeId = truckTypeId, YearIntroduced = 2012, IsActive = true
                    });
                    await _context.SaveChangesAsync();
                }

                if (!await _context.Vehicles.AnyAsync(v => v.TenantId == tenantId))
                {
                    var hubId = await _context.Hubs.Where(h => h.TenantId == tenantId).Select(h => h.Id).FirstAsync();
                    var driverId = await _context.Drivers.Where(d => d.TenantId == tenantId).Select(d => d.Id).FirstAsync();
                    var makeId = await _context.VehicleMakes.Where(m => m.TenantId == tenantId).Select(m => m.Id).FirstAsync();
                    var modelId = await _context.VehicleModels.Where(m => m.TenantId == tenantId && m.Name == "Actros").Select(m => m.Id).FirstAsync();
                    _context.Vehicles.Add(new Vehicle
                    {
                        Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id,
                        PlateNumber = "ABC1234", PlateChar = "A",
                        AlternativePlateNumber = "ALT-ABC1234", AlternativePlateChar = "A",
                        MakeId = makeId, ModelId = modelId, Year = DateTime.UtcNow.Year,
                        Type = "Truck", Capacity = 25000, FuelType = "Diesel", Status = "Active",
                        HubId = hubId, DriverId = driverId,
                        FuelLevel = 80, Mileage = 45230,
                        Location = "Riyadh Depot",
                        LastMaintenanceDate = DateTime.UtcNow.AddMonths(-1),
                        NextMaintenanceDate = DateTime.UtcNow.AddMonths(5),
                        InsuranceExpiry = DateTime.UtcNow.AddMonths(6),
                        RegistrationExpiry = DateTime.UtcNow.AddYears(1),
                        Notes = "Seed vehicle"
                    });
                    await _context.SaveChangesAsync();
                }

                // 8) Workshop
                if (!await _context.Workshops.AnyAsync(w => w.TenantId == tenantId))
                {
                    var cityId = await _context.Cities.Where(c => c.TenantId == tenantId && c.Name == "Riyadh").Select(c => c.Id).FirstAsync();
                    _context.Workshops.Add(new Workshop
                    {
                        Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id,
                        Name = "Al-Riyadh Auto Service", AlternativeName = "Riyadh Service",
                        Location = "Industrial Area, Riyadh", CityId = cityId,
                        Phone = "+966-11-222-3333", Email = "workshop@optiroute360.local",
                        Specialties = "Engine Repair, Transmission, Electrical",
                        Rating = 4.7m, Status = "Active", Capacity = 15, CurrentJobs = 3,
                        Latitude = 24.7136m, Longitude = 46.6753m, Type = "Maintenance"
                    });
                    await _context.SaveChangesAsync();
                }

                // 9) Maintenance Types and Preventive Maintenance
                if (!await _context.MaintenanceTypes.AnyAsync(mt => mt.TenantId == tenantId))
                {
                    _context.MaintenanceTypes.AddRange(new[]
                    {
                        new MaintenanceType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id, Name = "Oil Change", AlternativeName = "Oil", Description = "Engine oil change" },
                        new MaintenanceType { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id, Name = "Brake Inspection", AlternativeName = "Brake", Description = "Brake system check" }
                    });
                    await _context.SaveChangesAsync();
                }

                if (!await _context.PreventiveMaintenances.AnyAsync(p => p.TenantId == tenantId))
                {
                    var vehicleId = await _context.Vehicles.Where(v => v.TenantId == tenantId).Select(v => v.Id).FirstAsync();
                    var hubId = await _context.Hubs.Where(h => h.TenantId == tenantId).Select(h => h.Id).FirstAsync();
                    var mtId = await _context.MaintenanceTypes.Where(m => m.TenantId == tenantId && m.Name == "Oil Change").Select(m => m.Id).FirstAsync();
                    _context.PreventiveMaintenances.Add(new PreventiveMaintenance
                    {
                        Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id,
                        VehicleId = vehicleId, MaintenanceTypeId = mtId,
                        IntervalType = "Mileage", IntervalValue = 10000,
                        LastPerformed = DateTime.UtcNow.AddMonths(-2),
                        NextDue = DateTime.UtcNow.AddMonths(1),
                        Status = "Scheduled", Notes = "Initial schedule",
                        HubId = hubId
                    });
                    await _context.SaveChangesAsync();
                }

                // 10) Security Settings
                if (!await _context.SecuritySettings.AnyAsync(s => s.TenantId == tenantId))
                {
                    _context.SecuritySettings.Add(new SecuritySettings
                    {
                        Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id,
                        TwoFactorAuth = false, PasswordChangeRequired = false, SessionTimeout = 60,
                        LoginAlerts = true, DeviceManagement = true,
                        CurrentPassword = "", NewPassword = "", ConfirmPassword = ""
                    });
                    await _context.SaveChangesAsync();
                }

                // 11) SLAs Profiles
                if (!await _context.SLAsProfiles.AnyAsync(s => s.TenantId == tenantId))
                {
                    _context.SLAsProfiles.AddRange(new[]
                    {
                        new SLAsProfile { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id, SLAName = "Default", ResponseTime = 60, ResolutionTime = 240, Priority = "High", Status = "Active", ApplicableTo = "{\"entities\":[\"SupportTicket\"]}" },
                        new SLAsProfile { Id = Guid.NewGuid(), TenantId = tenantId, CreatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id, SLAName = "Maintenance", ResponseTime = 120, ResolutionTime = 1440, Priority = "Medium", Status = "Active", ApplicableTo = "{\"entities\":[\"PreventiveMaintenance\"]}" }
                    });
                    await _context.SaveChangesAsync();
                }

                // 12) Support Ticket
                if (!await _context.SupportTickets.AnyAsync(t => t.TenantId == tenantId))
                {
                    _context.SupportTickets.Add(new SupportTicket
                    {
                        Id = Guid.NewGuid(), TenantId = tenantId,
                        CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, CreatedBy = adminUser!.Id,
                        TicketNumber = "TCK-0001",
                        Title = "Onboarding assistance",
                        Description = "Please help with initial setup",
                        Priority = 1, Status = 1, Category = 1,
                        SubmittedById = adminUser!.Id,
                        AssignedToId = adminUser!.Id,
                        Responses = 0
                    });
                    await _context.SaveChangesAsync();
                }

                await transaction.CommitAsync();
                _logger.LogInformation("Database seeding completed.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while initializing the database");
                throw;
            }
        }

        private async Task DisableTenantCityCountryConstraints()
        {
            // FK names follow EF Core conventions; wrap in try-catch for safety
            try
            {
                await _context.Database.ExecuteSqlRawAsync("ALTER TABLE [TenantManagements] NOCHECK CONSTRAINT [FK_TenantManagements_Cities_CityId]");
            }
            catch {}
            try
            {
                await _context.Database.ExecuteSqlRawAsync("ALTER TABLE [TenantManagements] NOCHECK CONSTRAINT [FK_TenantManagements_Countries_CountryId]");
            }
            catch {}
        }

        private async Task ReenableTenantCityCountryConstraints()
        {
            try
            {
                await _context.Database.ExecuteSqlRawAsync("ALTER TABLE [TenantManagements] WITH CHECK CHECK CONSTRAINT [FK_TenantManagements_Cities_CityId]");
            }
            catch {}
            try
            {
                await _context.Database.ExecuteSqlRawAsync("ALTER TABLE [TenantManagements] WITH CHECK CHECK CONSTRAINT [FK_TenantManagements_Countries_CountryId]");
            }
            catch {}
        }

        private async Task DisableHubNearestWarehouseConstraint()
        {
            try
            {
                await _context.Database.ExecuteSqlRawAsync("ALTER TABLE [Hubs] NOCHECK CONSTRAINT [FK_Hubs_Hubs_NearestWarehouseId]");
            }
            catch {}
        }

        private async Task ReenableHubNearestWarehouseConstraint()
        {
            try
            {
                await _context.Database.ExecuteSqlRawAsync("ALTER TABLE [Hubs] WITH CHECK CHECK CONSTRAINT [FK_Hubs_Hubs_NearestWarehouseId]");
            }
            catch {}
        }
    }
}

