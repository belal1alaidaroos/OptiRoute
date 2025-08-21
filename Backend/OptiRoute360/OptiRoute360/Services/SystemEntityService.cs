using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data;
using OptiRoute360.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OptiRoute360.Services
{
    public class SystemEntityService
    {
        private readonly ApplicationDbContext _context;

        public SystemEntityService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task InitializeSystemEntities()
        {
            if (await _context.SystemEntities.AnyAsync()) return;

            // ✅ جيب TenantId أول واحد (اللي انزرع من DatabaseInitializer)
            var tenantId = await _context.TenantManagements
                .Select(t => t.Id)
                .FirstOrDefaultAsync();

            if (tenantId == Guid.Empty)
                throw new Exception("❌ No Tenant found. Make sure TenantManagement is seeded before SystemEntities.");

            var entities = new List<SystemEntity>
            {
                // System Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "AppearanceSettings", Module = "System", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "Attachment", Module = "System", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "AuditLog", Module = "System", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "ErrorLog", Module = "System", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "GeneralSettings", Module = "System", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "GlobalNotification", Module = "System", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "NotificationSettings", Module = "System", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "SecuritySettings", Module = "System", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "TenantManagement", Module = "System", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "UsageDashboard", Module = "System", TenantId = tenantId },

                // Location Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "City", Module = "Location", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "Country", Module = "Location", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "GeoZone", Module = "Location", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "Region", Module = "Location", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "Hub", Module = "Location", TenantId = tenantId },

                // Fleet Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "Driver", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "DriverMovementHistory", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "FuelManagement", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "FuelType", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "Maintenance", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "MaintenanceType", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "PreventiveMaintenance", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "Vehicle", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "VehicleDetail", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "VehicleMake", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "VehicleModel", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "VehicleType", Module = "Fleet", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "Workshop", Module = "Fleet", TenantId = tenantId },

                // Security Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "Role", Module = "Security", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "User", Module = "Security", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "PermissionMatrix", Module = "Security", TenantId = tenantId },

                // CRM Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "Customer", Module = "CRM", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "ServicesRequest", Module = "CRM", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "SupportTicket", Module = "CRM", TenantId = tenantId },

                // Logistics Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "Shipment", Module = "Logistics", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "Tracking", Module = "Logistics", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "Trip", Module = "Logistics", TenantId = tenantId },

                // Other Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "Integration", Module = "Integration", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "LicenseType", Module = "Legal", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "NotificationCenter", Module = "Communication", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "OptionSetValue", Module = "Configuration", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "Period", Module = "Configuration", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "SLAsProfile", Module = "Service", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "SMSTemplate", Module = "Communication", TenantId = tenantId },
                new() { EntityId = Guid.NewGuid(), EntityName = "UnitsMeasure", Module = "Configuration", TenantId = tenantId }
            };

            await _context.SystemEntities.AddRangeAsync(entities);
            await _context.SaveChangesAsync();
        }
    }
}
