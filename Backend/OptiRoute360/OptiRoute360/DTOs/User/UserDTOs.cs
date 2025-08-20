using OptiRoute360.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace OptiRoute360.DTOs.User
{
    public class UserDto
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(150)]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }

        public string Department { get; set; }
        public DateTime JoinDate { get; set; }
        public DateTime LastLogin { get; set; }
         
        public bool IsActive { get; set; }
        public Guid TenantId { get; set; }
    }

    public class UserResponseDto : UserDto
    {
        [Required]
        public UserRole Role { get; set; }
    }

    public class CreateUserDto
    {
        [Required]
        [StringLength(150)]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(20)]
        public string Phone { get; set; }

        [Required]
        public UserRole Role { get; set; }

        public string Department { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 8)]
        public string Password { get; set; }
    }

    public class UpdateUserDto
    {
        [StringLength(150)]
        public string FullName { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }

        public UserRole? Role { get; set; }
        public string Department { get; set; }
        public bool? IsActive { get; set; }
    }
    public class UpdatePasswordDto
    {
        [Required]
        [StringLength(20, MinimumLength = 8)]
        public string CurrentPassword { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 8)]
        public string NewPassword { get; set; }
    }
}