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

            var entities = new List<SystemEntity>
            {
                // System Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "AppearanceSettings", Module = "System" },
                new() { EntityId = Guid.NewGuid(), EntityName = "Attachment", Module = "System" },
                new() { EntityId = Guid.NewGuid(), EntityName = "AuditLog", Module = "System" },
                new() { EntityId = Guid.NewGuid(), EntityName = "ErrorLog", Module = "System" },
                new() { EntityId = Guid.NewGuid(), EntityName = "GeneralSettings", Module = "System" },
                new() { EntityId = Guid.NewGuid(), EntityName = "GlobalNotification", Module = "System" },
                new() { EntityId = Guid.NewGuid(), EntityName = "NotificationSettings", Module = "System" },
                new() { EntityId = Guid.NewGuid(), EntityName = "SecuritySettings", Module = "System" },
                new() { EntityId = Guid.NewGuid(), EntityName = "TenantManagement", Module = "System" },
                new() { EntityId = Guid.NewGuid(), EntityName = "UsageDashboard", Module = "System" },

                // Location Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "City", Module = "Location" },
                new() { EntityId = Guid.NewGuid(), EntityName = "Country", Module = "Location" },
                new() { EntityId = Guid.NewGuid(), EntityName = "GeoZone", Module = "Location" },
                new() { EntityId = Guid.NewGuid(), EntityName = "Region", Module = "Location" },
                new() { EntityId = Guid.NewGuid(), EntityName = "Hub", Module = "Location" },

                // Fleet Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "Driver", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "DriverMovementHistory", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "FuelManagement", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "FuelType", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "Maintenance", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "MaintenanceType", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "PreventiveMaintenance", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "Vehicle", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "VehicleDetail", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "VehicleMake", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "VehicleModel", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "VehicleType", Module = "Fleet" },
                new() { EntityId = Guid.NewGuid(), EntityName = "Workshop", Module = "Fleet" },

                // Security Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "Role", Module = "Security" },
                new() { EntityId = Guid.NewGuid(), EntityName = "User", Module = "Security" },
                new() { EntityId = Guid.NewGuid(), EntityName = "PermissionMatrix", Module = "Security" },

                // CRM Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "Customer", Module = "CRM" },
                new() { EntityId = Guid.NewGuid(), EntityName = "ServicesRequest", Module = "CRM" },
                new() { EntityId = Guid.NewGuid(), EntityName = "SupportTicket", Module = "CRM" },

                // Logistics Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "Shipment", Module = "Logistics" },
                new() { EntityId = Guid.NewGuid(), EntityName = "Tracking", Module = "Logistics" },
                new() { EntityId = Guid.NewGuid(), EntityName = "Trip", Module = "Logistics" },

                // Other Modules
                new() { EntityId = Guid.NewGuid(), EntityName = "Integration", Module = "Integration" },
                new() { EntityId = Guid.NewGuid(), EntityName = "LicenseType", Module = "Legal" },
                new() { EntityId = Guid.NewGuid(), EntityName = "NotificationCenter", Module = "Communication" },
                new() { EntityId = Guid.NewGuid(), EntityName = "OptionSetValue", Module = "Configuration" },
                new() { EntityId = Guid.NewGuid(), EntityName = "Period", Module = "Configuration" },
                new() { EntityId = Guid.NewGuid(), EntityName = "SLAsProfile", Module = "Service" },
                new() { EntityId = Guid.NewGuid(), EntityName = "SMSTemplate", Module = "Communication" },
                new() { EntityId = Guid.NewGuid(), EntityName = "UnitsMeasure", Module = "Configuration" }
            };

            await _context.SystemEntities.AddRangeAsync(entities);
            await _context.SaveChangesAsync();
        }
    }
}