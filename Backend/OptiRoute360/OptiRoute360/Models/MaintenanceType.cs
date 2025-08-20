using OptiRoute360.Data.Entities;

public class MaintenanceType : BaseEntity
{
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Description { get; set; }
    public ICollection<Maintenance> Maintenances { get; set; } = new List<Maintenance>();
    public ICollection<PreventiveMaintenance> PreventiveMaintenances { get; set; } = new List<PreventiveMaintenance>();

    
}