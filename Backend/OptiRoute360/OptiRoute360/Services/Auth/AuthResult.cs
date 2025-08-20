using OptiRoute360.DTOs.User;
using OptiRoute360.Services.Auth;

namespace OptiRoute360.Models.Auth
{
    public class AuthResult
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public DateTime TokenExpiry { get; set; }
        public bool Success { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
        public UserProfileDto UserProfile { get; set; }
        public AppearanceSettingsDto AppearanceSettings { get; set; }
        public Dictionary<string, EntityPermissions> Permissions { get; set; }

        public static AuthResult Failure(string error, int statusCode = 400)
        {
            return new AuthResult
            {
                Success = false,
                Errors = new List<string> { error }
            };
        }
        public static AuthResult SuccessWithUser(
    string token,
    string refreshToken,
    DateTime expiry,
    UserDto user,
    AppearanceSettingsDto appearance,
    Dictionary<string, EntityPermissions> permissions)
{
    return new AuthResult
    {
        Token = token,
        RefreshToken = refreshToken,
        TokenExpiry = expiry,
        Success = true,
        UserProfile = new UserProfileDto
        {
            Id = user.Id,
            FirstName = user.FullName,
            LastName = "",
            Email = user.Email
        },
        AppearanceSettings = appearance,
        Permissions = permissions
    };
}
       
    }
}