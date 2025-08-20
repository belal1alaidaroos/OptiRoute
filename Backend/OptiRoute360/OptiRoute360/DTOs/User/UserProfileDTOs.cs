using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class UserProfileDto
{
    public Guid Id { get; set; }

    [Required]
    [StringLength(50)]
    public string FirstName { get; set; }

    [Required]
    [StringLength(50)]
    public string LastName { get; set; }

    [NotMapped]
    public string FullName => $"{FirstName} {LastName}";

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Phone]
    [StringLength(20)]
    public string Phone { get; set; }

    public string Role { get; set; }
    public string Department { get; set; }

    [Url]
    public string Avatar { get; set; }
}

public class UpdateUserProfileDto
{
    [StringLength(50)]
    public string FirstName { get; set; }

    [StringLength(50)]
    public string LastName { get; set; }
    public string FullName => $"{FirstName} {LastName}";


    [Phone]
    [StringLength(20)]
    public string Phone { get; set; }

    [StringLength(100)]
    public string Department { get; set; }

    [Url]
    public string Avatar { get; set; }

}