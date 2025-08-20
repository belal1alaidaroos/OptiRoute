using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Countries
        CreateMap<Country, CountryDto>().ReverseMap();
        CreateMap<CreateCountryDto, Country>();
        CreateMap<UpdateCountryDto, Country>();

        // Drivers
        CreateMap<Driver, DriverDto>()
            .ForMember(d => d.LicenseNumber, o => o.MapFrom(s => s.License))
            .ForMember(d => d.LicenseTypeName, o => o.MapFrom(s => s.LicenseType.Name))
            .ForMember(d => d.VehicleTypeName, o => o.MapFrom(s => s.VehicleType.Name))
            .ForMember(d => d.HubName, o => o.MapFrom(s => s.Hub.Name));
        CreateMap<CreateDriverDto, Driver>()
            .ForMember(d => d.License, o => o.MapFrom(s => s.LicenseNumber));
        CreateMap<UpdateDriverDto, Driver>();

        // Vehicles
        CreateMap<Vehicle, VehicleDto>()
            .ForMember(d => d.HubName, o => o.MapFrom(s => s.Hub.Name))
            .ForMember(d => d.DriverName, o => o.MapFrom(s => s.Driver.Name));
        CreateMap<UpdateMaintenanceStatusDto, Vehicle>();
        CreateMap<CreateVehicleDto, Vehicle>();
        CreateMap<UpdateVehicleDto, Vehicle>();

        // Workshops
        CreateMap<Workshop, WorkshopDto>()
            .ForMember(d => d.CityName, o => o.MapFrom(s => s.City.Name));

        // License Types
        CreateMap<LicenseType, LicenseTypeDto>().ReverseMap();
        CreateMap<CreateLicenseTypeDto, LicenseType>();
        CreateMap<UpdateLicenseTypeDto, LicenseType>();

        // Maintenance Types
        CreateMap<MaintenanceType, MaintenanceTypeDto>().ReverseMap();
        CreateMap<CreateMaintenanceTypeDto, MaintenanceType>();
        CreateMap<UpdateMaintenanceTypeDto, MaintenanceType>();

        // Usage Dashboard
        CreateMap<UsageDashboard, UsageDashboardDto>().ReverseMap();
        CreateMap<CreateUsageDashboardDto, UsageDashboard>();
        CreateMap<UpdateUsageDashboardDto, UsageDashboard>();

        // Customers
        CreateMap<Customer, CustomerDto>()
            .ForMember(d => d.CountryName, o => o.MapFrom(s => s.Country.Name))
            .ForMember(d => d.RegionName, o => o.MapFrom(s => s.Region.Name))
            .ForMember(d => d.CityName, o => o.MapFrom(s => s.City.Name));
        CreateMap<CreateCustomerDto, Customer>();
        CreateMap<UpdateCustomerDto, Customer>();

        // User Profile
        CreateMap<UserProfile, UserProfileDto>().ReverseMap();
        CreateMap<UpdateUserProfileDto, UserProfile>();

        // Regions
        CreateMap<Region, RegionDto>()
            .ForMember(d => d.CountryName, o => o.MapFrom(s => s.Country.Name));
        CreateMap<CreateRegionDto, Region>();
        CreateMap<UpdateRegionDto, Region>();

        // Cities
        CreateMap<City, CityDto>()
            .ForMember(d => d.RegionName, o => o.MapFrom(s => s.Region.Name))
            .ForMember(d => d.CountryName, o => o.MapFrom(s => s.Country.Name));
        CreateMap<CreateCityDto, City>();
        CreateMap<UpdateCityDto, City>();
    }
}

