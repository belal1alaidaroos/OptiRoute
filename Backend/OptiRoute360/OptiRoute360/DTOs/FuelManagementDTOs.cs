// 9. FuelManagement DTOs
using System.ComponentModel.DataAnnotations;

public class FuelManagementDto {
    public Guid Id { get; set; }
    public Guid VehicleId { get; set; }
    public string VehiclePlate { get; set; }
    public Guid DriverId { get; set; }
    public string DriverName { get; set; }
    public Guid FuelStationId { get; set; }
    public string FuelStationName { get; set; }
    public string FuelType { get; set; }
    public decimal Quantity { get; set; }
    public decimal PricePerLiter { get; set; }
    public decimal TotalCost { get; set; }
    public int Mileage { get; set; }
    public DateTime Date { get; set; }
    public string ReceiptNumber { get; set; }
}

public class CreateFuelManagementDto {
    [Required] public Guid VehicleId { get; set; }
    [Required] public Guid DriverId { get; set; }
    [Required] public Guid FuelStationId { get; set; }
    [Required] public string FuelType { get; set; }
    [Required][Range(0.1, 1000)] public decimal Quantity { get; set; }
    [Required][Range(0.01, 100)] public decimal PricePerLiter { get; set; }
    [Required] public int Mileage { get; set; }
    public string ReceiptNumber { get; set; }
}