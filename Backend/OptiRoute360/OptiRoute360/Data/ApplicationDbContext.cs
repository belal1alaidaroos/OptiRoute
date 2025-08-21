using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data.Entities;
using OptiRoute360.Models.Interfaces;
using OptiRoute360.Services;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection.Emit;

namespace OptiRoute360.Data
{

    public class ApplicationDbContext : DbContext
    {
        private readonly ITenantProvider _tenantProvider;
        private readonly ICurrentUserService _currentUserService;

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            ITenantProvider tenantProvider,
            ICurrentUserService currentUserService)
            : base(options)
        {
            _tenantProvider = tenantProvider;
            _currentUserService = currentUserService;
        }

        // DbSets for all entities
        public DbSet<TenantManagement> TenantManagements { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<GeoZone> GeoZones { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<LicenseType> LicenseTypes { get; set; }
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<VehicleMake> VehicleMakes { get; set; }
        public DbSet<VehicleModel> VehicleModels { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleDetail> VehicleDetails { get; set; }
        public DbSet<Hub> Hubs { get; set; }
        public DbSet<Workshop> Workshops { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Period> Periods { get; set; }
        public DbSet<MaintenanceType> MaintenanceTypes { get; set; }
        public DbSet<Maintenance> Maintenances { get; set; }
        public DbSet<PreventiveMaintenance> PreventiveMaintenances { get; set; }
        public DbSet<FuelType> FuelTypes { get; set; }
        public DbSet<FuelManagement> FuelManagement { get; set; }
        public DbSet<DriverMovementHistory> DriverMovementHistory { get; set; }
        public DbSet<Tracking> Tracking { get; set; }
        public DbSet<GlobalNotification> GlobalNotifications { get; set; }
        public DbSet<NotificationCenter> NotificationCenters { get; set; }
        public DbSet<NotificationSettings> NotificationSettings { get; set; }
        public DbSet<SMSTemplate> SMSTemplates { get; set; }
        public DbSet<AppearanceSettings> AppearanceSettings { get; set; }
        public DbSet<GeneralSettings> GeneralSettings { get; set; }
        public DbSet<SecuritySettings> SecuritySettings { get; set; }
        public DbSet<PermissionMatrix> PermissionMatrices { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }
        public DbSet<ErrorLog> ErrorLogs { get; set; }
        public DbSet<Integration> Integrations { get; set; }
        public DbSet<ServicesRequest> ServicesRequests { get; set; }
        public DbSet<SLAsProfile> SLAsProfiles { get; set; }
        public DbSet<SupportTicket> SupportTickets { get; set; }
        public DbSet<UnitsMeasure> UnitsMeasures { get; set; }
        public DbSet<UsageDashboard> UsageDashboards { get; set; }
        public DbSet<OptionSetValue> OptionSetValues { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<SystemEntity> SystemEntities { get; set; } // Add this line
        public DbSet<UserRole> UserRoles { get; set; } // Add this line
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder.Properties<decimal>().HavePrecision(9, 6);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Multi-Tenant Query Filter (TenantId Filtering)
            foreach (var entityType in modelBuilder.Model.GetEntityTypes()
                .Where(e => typeof(BaseEntity).IsAssignableFrom(e.ClrType)))
            {
                modelBuilder.Entity(entityType.ClrType)
                    .HasQueryFilter(GetTenantFilter(entityType.ClrType));
            }

            // Foreign Key Relation to TenantManagement for all BaseEntities except TenantManagement itself
            foreach (var entityType in modelBuilder.Model.GetEntityTypes()
                .Where(e => typeof(BaseEntity).IsAssignableFrom(e.ClrType) && e.ClrType != typeof(TenantManagement)))
            {
                modelBuilder.Entity(entityType.ClrType)
                    .HasOne(typeof(TenantManagement))
                    .WithMany()
                    .HasForeignKey("TenantId")
                    .OnDelete(DeleteBehavior.NoAction);
            }

            // UserRole Configuration
            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasOne(ur => ur.User)
                      .WithMany(u => u.UserRoles)
                      .HasForeignKey(ur => ur.UserId)
                      .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(ur => ur.Role)
                      .WithMany(r => r.UserRoles)
                      .HasForeignKey(ur => ur.RoleId)
                      .OnDelete(DeleteBehavior.NoAction);

                entity.HasKey(ur => new { ur.UserId, ur.RoleId });

                entity.HasIndex(ur => new { ur.UserId, ur.RoleId, ur.TenantId }).IsUnique();
            });

            //modelBuilder.Entity<NotificationSettings>(entity =>
            //{
            //    entity.HasOne(ns => ns.User)
            //          .WithOne(u => u.NotificationSettings)
            //          .HasForeignKey<NotificationSettings>(ns => ns.UserId)
            //          .OnDelete(DeleteBehavior.NoAction);

            //    entity.HasIndex(ns => new { ns.UserId, ns.TenantId }).IsUnique();  // Multi-Tenant Constraint
            //});


            // AppearanceSettings Configuration
            modelBuilder.Entity<AppearanceSettings>(entity =>
            {
                entity.HasIndex(a => new { a.UserId, a.TenantId }).IsUnique();

                entity.HasOne(a => a.User)
                      .WithOne(u => u.AppearanceSettings)
                      .HasForeignKey<AppearanceSettings>(a => a.UserId)
                      .OnDelete(DeleteBehavior.NoAction);
            });



            // RefreshToken Configuration
            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.HasOne(rt => rt.User)
                      .WithMany()
                      .HasForeignKey(rt => rt.UserId)
                      .OnDelete(DeleteBehavior.NoAction);
            });
            modelBuilder.Entity<SupportTicket>(entity =>
            {
                entity.HasOne(st => st.AssignedTo)
                      .WithMany()
                      .HasForeignKey(st => st.AssignedToId)
                      .OnDelete(DeleteBehavior.NoAction); // OK ✅

                entity.HasOne(st => st.SubmittedBy)
                      .WithMany()
                      .HasForeignKey(st => st.SubmittedById)
                      .OnDelete(DeleteBehavior.NoAction); // FIX 🚫 (No Cascade)
            });


            // Existing Relationships (Leave as is)
            ConfigureUserRelationships(modelBuilder);
            ConfigureRoleRelationships(modelBuilder);
            ConfigureTenantRelationships(modelBuilder);
            ConfigureLocationRelationships(modelBuilder);
            ConfigureCustomerRelationships(modelBuilder);
            ConfigureDriverRelationships(modelBuilder);
            ConfigureVehicleRelationships(modelBuilder);
            ConfigureHubRelationships(modelBuilder);
            ConfigureWorkshopRelationships(modelBuilder);
            ConfigureTripRelationships(modelBuilder);
            ConfigureShipmentRelationships(modelBuilder);
            ConfigureMaintenanceRelationships(modelBuilder);
            ConfigureFuelRelationships(modelBuilder);
            ConfigureTrackingRelationships(modelBuilder);
            ConfigureNotificationRelationships(modelBuilder);
            ConfigureSettingsRelationships(modelBuilder);
            ConfigureAttachmentRelationships(modelBuilder);
            ConfigureLogRelationships(modelBuilder);
            // ConfigureServiceRelationships(modelBuilder); // if exists

            // OptionSetValue indexing and uniqueness per scope
            modelBuilder.Entity<OptionSetValue>(entity =>
            {
                entity.HasIndex(o => new { o.TenantId, o.OptionSetName, o.OwnerEntity, o.OwnerId, o.IsActive, o.SortOrder });
                entity.HasIndex(o => new { o.TenantId, o.OptionSetName, o.OwnerEntity, o.OwnerId, o.Code }).IsUnique(false);
                entity.HasIndex(o => new { o.TenantId, o.OptionSetName, o.OwnerEntity, o.OwnerId, o.Name }).IsUnique(false);
            });
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    // Configure multi-tenancy filter
        //    foreach (var entityType in modelBuilder.Model.GetEntityTypes()
        //        .Where(e => typeof(BaseEntity).IsAssignableFrom(e.ClrType)))
        //    {
        //        modelBuilder.Entity(entityType.ClrType)
        //            .HasQueryFilter(GetTenantFilter(entityType.ClrType));
        //    }
        //    modelBuilder.Entity<UserRole>(entity =>
        //    {
        //        // Composite foreign keys
        //        entity.HasOne(ur => ur.User)
        //              .WithMany(u => u.UserRoles)
        //              .HasForeignKey(ur => ur.UserId)
        //              .OnDelete(DeleteBehavior.NoAction);

        //        entity.HasOne(ur => ur.Role)
        //              .WithMany(r => r.UserRoles)
        //              .HasForeignKey(ur => ur.RoleId)
        //              .OnDelete(DeleteBehavior.NoAction);
        //        //user roles    
        //        modelBuilder.Entity<User>()
        //            .HasMany(u => u.UserRoles)
        //            .WithOne(ur => ur.User)
        //            .HasForeignKey(ur => ur.UserId)
        //            .OnDelete(DeleteBehavior.NoAction);
        //        modelBuilder.Entity<UserRole>(entity =>
        //        {
        //            //  Composite Primary Key
        //            entity.HasKey(ur => new { ur.UserId, ur.RoleId });

        //            //  Relation to User
        //            entity.HasOne(ur => ur.User)
        //                  .WithMany(u => u.UserRoles)
        //                  .HasForeignKey(ur => ur.UserId)
        //                  .OnDelete(DeleteBehavior.NoAction);

        //            //  Relation to Role
        //            entity.HasOne(ur => ur.Role)
        //                  .WithMany(r => r.UserRoles)
        //                  .HasForeignKey(ur => ur.RoleId)
        //                  .OnDelete(DeleteBehavior.NoAction);
        //        });

        //        // Ensure unique role per user per tenant
        //        entity.HasIndex(ur => new { ur.UserId, ur.RoleId, ur.TenantId })
        //              .IsUnique();
        //    });
        //    //modelBuilder.Entity<AppearanceSettings>(entity =>
        //    //{                             
        //    //    // Ensure unique role per user per tenant
        //    //    entity.HasIndex(ur => new { ur.UserId, ur.TenantId })
        //    //          .IsUnique();
        //    //});
        //    //modelBuilder.Entity<User>()
        //    //            .HasOne(u => u.AppearanceSettings)
        //    //            .WithOne()
        //    //            .HasForeignKey<AppearanceSettings>(a => a.UserId)
        //    //            .OnDelete(DeleteBehavior.NoAction);
        //    modelBuilder.Entity<AppearanceSettings>(entity =>
        //    {
        //        entity.HasIndex(a => new { a.UserId, a.TenantId }).IsUnique(); // Optional لو فيه TenantId

        //        entity.HasOne(a => a.User)
        //              .WithMany() // ⚠️ No Navigation in User side
        //              .HasForeignKey(a => a.UserId)
        //              .OnDelete(DeleteBehavior.NoAction);
        //    });

        //    modelBuilder.Entity<RefreshToken>(entity =>
        //    {
        //        entity.HasOne(rt => rt.User)
        //              .WithMany()
        //              .HasForeignKey(rt => rt.UserId)
        //              .OnDelete(DeleteBehavior.NoAction);
        //    });

        //    // Configure all entity relationships
        //    ConfigureUserRelationships(modelBuilder);
        //    ConfigureRoleRelationships(modelBuilder);
        //    ConfigureTenantRelationships(modelBuilder);
        //    ConfigureLocationRelationships(modelBuilder);
        //    ConfigureCustomerRelationships(modelBuilder);
        //    ConfigureDriverRelationships(modelBuilder);
        //    ConfigureVehicleRelationships(modelBuilder);
        //    ConfigureHubRelationships(modelBuilder);
        //    ConfigureWorkshopRelationships(modelBuilder);
        //    ConfigureTripRelationships(modelBuilder);
        //    ConfigureShipmentRelationships(modelBuilder);
        //    ConfigureMaintenanceRelationships(modelBuilder);
        //    ConfigureFuelRelationships(modelBuilder);
        //    ConfigureTrackingRelationships(modelBuilder);
        //    ConfigureNotificationRelationships(modelBuilder);
        //    ConfigureSettingsRelationships(modelBuilder);
        //    ConfigureAttachmentRelationships(modelBuilder);
        //    ConfigureLogRelationships(modelBuilder);
        //    //ConfigureServiceRelationships(modelBuilder);
        //}

        // ========== COMPLETE RELATIONSHIP CONFIGURATIONS ==========

        private static void ConfigureUserRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Hub>(entity =>
            {
                entity.HasOne(h => h.Manager)
                      .WithMany()
                      .HasForeignKey(h => h.ManagerId)
                      .OnDelete(DeleteBehavior.NoAction);  // OK ✅

                entity.HasOne(h => h.Supervisor)
                      .WithMany()
                      .HasForeignKey(h => h.SupervisorId)
                      .OnDelete(DeleteBehavior.NoAction);  // FIX 🚫 (No Cascade)
            });

            //modelBuilder.Entity<User>()
            //    .Property(u => u.Role)
            //    .HasMaxLength(50);

            //// User as Manager/Supervisor for Hubs
            //modelBuilder.Entity<User>()
            //    .HasMany(u => u.ManagedHubs)
            //    .WithOne(h => h.Manager)
            //    .HasForeignKey(h => h.ManagerId)
            //    .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<User>()
            //    .HasMany(u => u.SupervisedHubs)
            //    .WithOne(h => h.Supervisor)
            //    .HasForeignKey(h => h.SupervisorId)
            //    .OnDelete(DeleteBehavior.NoAction);

            // User as AssignedTo for SupportTickets
            //modelBuilder.Entity<User>()
            //    .HasMany(u => u.AssignedTickets)
            //    .WithOne(t => t.AssignedTo)
            //    .HasForeignKey(t => t.AssignedToId)
            //    .OnDelete(DeleteBehavior.NoAction);

            //// User as UploadedBy for Attachments
            //modelBuilder.Entity<User>()
            //    .HasMany(u => u.UploadedAttachments)
            //    .WithOne(a => a.UploadedBy)
            //    .HasForeignKey(a => a.UploadedById)
            //.OnDelete(DeleteBehavior.NoAction);


            //  User
            modelBuilder.Entity<User>(entity =>
            {
                //  one-to-one with UserProfile
                entity.HasOne(u => u.Profile)
                    .WithOne(p => p.User)
                    .HasForeignKey<UserProfile>(p => p.UserId)
                    .OnDelete(DeleteBehavior.NoAction);              
            });

          



            //   UserProfile
            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.AvatarUrl)
                    .HasMaxLength(500);

                entity.Property(p => p.Bio)
                    .HasMaxLength(1000);
            });
            // Add explicit FK relations to TenantManagement for all BaseEntities
            foreach (var entityType in modelBuilder.Model.GetEntityTypes()
                .Where(e => typeof(BaseEntity).IsAssignableFrom(e.ClrType) && e.ClrType != typeof(TenantManagement)))
            {
                modelBuilder.Entity(entityType.ClrType)
                    .HasOne(typeof(TenantManagement)) // No Navigation Property
                    .WithMany()
                    .HasForeignKey("TenantId") // Explicit FK on TenantId property
                    .OnDelete(DeleteBehavior.NoAction);
            }

        }

        private static void ConfigureRoleRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>()
                .HasIndex(r => r.Name)
            .IsUnique();
        }

        private static void ConfigureTenantRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TenantManagement>()
                .HasMany(t => t.SupportTickets)
                .WithOne(t => t.Tenant)
                .HasForeignKey(t => t.TenantId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<TenantManagement>()
                .HasOne(t => t.Country)
                .WithMany()
                .HasForeignKey(t => t.CountryId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<TenantManagement>()
                .HasOne(t => t.City)
                .WithMany()
                .HasForeignKey(t => t.CityId)
            .OnDelete(DeleteBehavior.NoAction);
        }

        private static void ConfigureLocationRelationships(ModelBuilder modelBuilder)
        {
            // Country -> Region -> City hierarchy
            modelBuilder.Entity<Country>()
                .HasMany(c => c.Regions)
                .WithOne(r => r.Country)
                .HasForeignKey(r => r.CountryId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Region>()
                .HasMany(r => r.Cities)
                .WithOne(c => c.Region)
                .HasForeignKey(c => c.RegionId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<City>()
                .HasMany(c => c.GeoZones)
                .WithOne(g => g.City)
                .HasForeignKey(g => g.CityId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<City>()
                .HasMany(c => c.Hubs)
                .WithOne(h => h.City)
                .HasForeignKey(h => h.CityId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<City>()
                .HasMany(c => c.Workshops)
                .WithOne(w => w.City)
                .HasForeignKey(w => w.CityId)
            .OnDelete(DeleteBehavior.NoAction);
        }

        private static void ConfigureCustomerRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasIndex(c => c.CustomerId)
                .IsUnique();

            modelBuilder.Entity<Customer>()
                .HasIndex(c => c.Email)
                .IsUnique();

            modelBuilder.Entity<Customer>()
                .HasMany(c => c.Shipments)
                .WithOne(s => s.Customer)
                .HasForeignKey(s => s.CustomerId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Customer>()
                .HasOne(c => c.Country)
                .WithMany()
                .HasForeignKey(c => c.CountryId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Customer>()
                .HasOne(c => c.Region)
                .WithMany()
                .HasForeignKey(c => c.RegionId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Customer>()
                .HasOne(c => c.City)
                .WithMany()
                .HasForeignKey(c => c.CityId)
            .OnDelete(DeleteBehavior.NoAction);
        }

        private static void ConfigureDriverRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Driver>()
                .HasIndex(d => d.License)
                .IsUnique();

            modelBuilder.Entity<Driver>()
                .HasMany(d => d.Trip)
                .WithOne(t => t.Driver)
                .HasForeignKey(t => t.DriverId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Driver>()
                .HasMany(d => d.AssignedVehicles)
                .WithOne(v => v.Driver)
                .HasForeignKey(v => v.DriverId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Driver>()
                .HasMany(d => d.FuelManagements)
                .WithOne(f => f.Driver)
                .HasForeignKey(f => f.DriverId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Driver>()
                .HasMany(d => d.MovementHistory)
                .WithOne(m => m.Driver)
                .HasForeignKey(m => m.DriverId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Driver>()
                .HasOne(d => d.LicenseType)
                .WithMany()
                .HasForeignKey(d => d.LicenseTypeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Driver>()
                .HasOne(d => d.VehicleType)
                .WithMany()
                .HasForeignKey(d => d.VehicleTypeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Driver>()
                .HasOne(d => d.Hub)
                .WithMany(h => h.Drivers)
                .HasForeignKey(d => d.HubId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        private static void ConfigureVehicleRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VehicleMake>()
                .HasMany(m => m.Models)
                .WithOne(m => m.Make)
                .HasForeignKey(m => m.MakeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<VehicleModel>()
                .HasOne(m => m.Type)
                .WithMany()
                .HasForeignKey(m => m.TypeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Vehicle>()
                .HasIndex(v => v.PlateNumber)
                .IsUnique();

            modelBuilder.Entity<Vehicle>()
                .HasOne(v => v.Make)
                .WithMany()
                .HasForeignKey(v => v.MakeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Vehicle>()
                .HasOne(v => v.Model)
                .WithMany()
                .HasForeignKey(v => v.ModelId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Vehicle>()
                .HasOne(v => v.Hub)
                .WithMany(h => h.Vehicles)
                .HasForeignKey(v => v.HubId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Vehicle>()
                .HasMany(v => v.Trips)
                .WithOne(t => t.Vehicle)
                .HasForeignKey(t => t.VehicleId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Vehicle>()
                .HasMany(v => v.Maintenances)
                .WithOne(m => m.Vehicle)
                .HasForeignKey(m => m.VehicleId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Vehicle>()
                .HasMany(v => v.PreventiveMaintenances)
                .WithOne(p => p.Vehicle)
                .HasForeignKey(p => p.VehicleId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Vehicle>()
                .HasMany(v => v.FuelRecords)
                .WithOne(f => f.Vehicle)
                .HasForeignKey(f => f.VehicleId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Vehicle>()
                .HasOne(v => v.VehicleDetail)
                .WithOne(d => d.Vehicle)
                .HasForeignKey<VehicleDetail>(d => d.VehicleId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        private static void ConfigureHubRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hub>()
                .HasIndex(h => h.HubCode)
                .IsUnique();

            modelBuilder.Entity<Hub>()
                .HasOne(h => h.NearestWarehouse)
                .WithMany()
                .HasForeignKey(h => h.NearestWarehouseId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Hub>()
                .HasOne(h => h.Zone)
                .WithMany()
                .HasForeignKey(h => h.ZoneId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Hub>()
                          .HasMany(h => h.Shipments)
                          .WithOne(s => s.Hub)
                          .HasForeignKey(s => s.HubId)
                          .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Hub>()
                .HasMany(h => h.Maintenances)
                .WithOne(m => m.Hub)
                .HasForeignKey(m => m.HubId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Hub>()
                .HasMany(h => h.PreventiveMaintenances)
                .WithOne(p => p.Hub)
                .HasForeignKey(p => p.HubId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Hub>()
                .HasMany(h => h.FuelRecords)
                .WithOne(f => f.Hub)
                .HasForeignKey(f => f.HubId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Hub>()
                .HasMany(h => h.Trackings)
                .WithOne(t => t.Hub)
                .HasForeignKey(t => t.HubId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        private static void ConfigureWorkshopRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Workshop>()
                .HasMany(w => w.Maintenances)
                .WithOne(m => m.Workshop)
                .HasForeignKey(m => m.WorkshopId)
                .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<Workshop>()
            //    .HasMany(w => w.ServiceRequests)
            //    .WithOne(s => s.Workshop)
            //    .HasForeignKey(s => s.WorkshopId)
            //    .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Workshop>()
                .HasMany(w => w.FuelManagements)
                .WithOne(f => f.FuelStation)
                .HasForeignKey(f => f.FuelStationId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        private static void ConfigureTripRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Trip>()
                .HasIndex(t => t.TripNumber)
                .IsUnique();

            modelBuilder.Entity<Trip>()
                .HasOne(t => t.StartHub)
                .WithMany()
                .HasForeignKey(t => t.StartHubId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Trip>()
                .HasOne(t => t.EndHub)
                .WithMany()
                .HasForeignKey(t => t.EndHubId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Trip>()
                .HasMany(t => t.Shipments)
                .WithOne(s => s.Trip)
                .HasForeignKey(s => s.TripId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Trip>()
                .HasMany(t => t.MovementHistory)
                .WithOne(m => m.Trip)
                .HasForeignKey(m => m.TripId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        private static void ConfigureShipmentRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Shipment>()
                .HasIndex(s => s.ShipmentNumber)
                .IsUnique();

            //modelBuilder.Entity<Shipment>()
            //    .HasOne(s => s.Period)
            //    .WithMany()
            //    .HasForeignKey(s => s.Period)
            //    .OnDelete(DeleteBehavior.NoAction);

            
        }

        private static void ConfigureMaintenanceRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MaintenanceType>()
                .HasMany(m => m.Maintenances)
                .WithOne(m => m.MaintenanceType)
                .HasForeignKey(m => m.MaintenanceTypeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<MaintenanceType>()
                .HasMany(m => m.PreventiveMaintenances)
                .WithOne(p => p.MaintenanceType)
                .HasForeignKey(p => p.MaintenanceTypeId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        private static void ConfigureFuelRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FuelType>()
                .HasIndex(f => f.Code)
            .IsUnique();
        }

        private static void ConfigureTrackingRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tracking>()
                .HasOne(t => t.Period)
                .WithMany()
                .HasForeignKey(t => t.PeriodId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        private static void ConfigureNotificationRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NotificationSettings>(entity =>
            {
                entity.HasOne(n => n.User)
                      .WithOne(u => u.NotificationSettings)
                      .HasForeignKey<NotificationSettings>(n => n.UserId)
                      .OnDelete(DeleteBehavior.NoAction);

                entity.HasIndex(n => new { n.UserId, n.TenantId }).IsUnique(); // Multi-Tenant Constraint (Optional)
            });

        }

        private static void ConfigureSettingsRelationships(ModelBuilder modelBuilder)
        {
            // Settings typically don't have relationships
        }

        private static void ConfigureAttachmentRelationships(ModelBuilder modelBuilder)
        {
            // Relationships already configured in UserRelationships
        }

        private static void ConfigureLogRelationships(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuditLog>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ErrorLog>()
                .HasOne(e => e.AssignedTo)
                .WithMany()
                .HasForeignKey(e => e.AssignedToId)
                .OnDelete(DeleteBehavior.NoAction);
        }

        //private static void ConfigureServiceRelationships(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<ServicesRequest>()
        //        .HasMany(s => s.Vehicles)
        //        .WithMany(v => v.ServiceRequests)
        //        .UsingEntity(j => j.ToTable("ServiceRequestVehicles"));
        //}

       

        protected LambdaExpression GetTenantFilter(Type entityType)
        {
            var tenantInterface = typeof(ITenantEntity);
            if (!tenantInterface.IsAssignableFrom(entityType))
                return null;

            var parameter = Expression.Parameter(entityType, "e");
            var tenantIdProperty = Expression.Property(parameter, nameof(ITenantEntity.TenantId));
            var currentTenantId = Expression.Constant(_tenantProvider.GetTenantId());
            var body = Expression.Equal(tenantIdProperty, currentTenantId);

            return Expression.Lambda(body, parameter);
        }
    }
   
}
