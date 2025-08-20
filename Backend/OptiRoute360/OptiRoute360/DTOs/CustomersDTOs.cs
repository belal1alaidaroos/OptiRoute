// 39. Customers DTOs
using System.ComponentModel.DataAnnotations;

public class CustomerDto {
    public Guid Id { get; set; }
    public string CustomerId { get; set; }
    public string Name { get; set; }
    public string AlternativeName { get; set; }
    public string Phone { get; set; }
    public string Landline { get; set; }
    public string Email { get; set; }
    public Guid CountryId { get; set; }
    public string CountryName { get; set; }
    public Guid RegionId { get; set; }
    public string RegionName { get; set; }
    public Guid CityId { get; set; }
    public string CityName { get; set; }
    public string Address { get; set; }
    public string Status { get; set; }
    public DateTime JoinDate { get; set; }
    public int TotalOrders { get; set; }
    public decimal TotalValue { get; set; }
}

public class CreateCustomerDto {
    [Required] public string CustomerId { get; set; }
    [Required][StringLength(100)] public string Name { get; set; }
    [StringLength(100)] public string AlternativeName { get; set; }
    [Required][Phone] public string Phone { get; set; }
    [Phone] public string Landline { get; set; }
    [Required][EmailAddress] public string Email { get; set; }
    [Required] public Guid CountryId { get; set; }
    [Required] public Guid RegionId { get; set; }
    [Required] public Guid CityId { get; set; }
    [Required] public string Address { get; set; }
}

public class UpdateCustomerDto {
    [StringLength(100)] public string Name { get; set; }
    [StringLength(100)] public string AlternativeName { get; set; }
    [Phone] public string Phone { get; set; }
    [EmailAddress] public string Email { get; set; }
    public Guid? CountryId { get; set; }
    public Guid? RegionId { get; set; }
    public Guid? CityId { get; set; }
    public string Status { get; set; }
}