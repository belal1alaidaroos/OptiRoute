using OptiRoute360.DTOs.User;
using System.ComponentModel.DataAnnotations;

namespace OptiRoute360.DTOs.Auth
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public UserDto User { get; set; }
        public AppearanceSettingsDto Appearance { get; set; }
    }
}
