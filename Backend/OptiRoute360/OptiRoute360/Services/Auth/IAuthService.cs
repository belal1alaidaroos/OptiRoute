using Microsoft.AspNetCore.Identity.Data;
using OptiRoute360.Models.Auth;

namespace OptiRoute360.Services.Auth
{
    public interface IAuthService
    {
        Task<AuthResult> AuthenticateAsync(LoginRequest request);
        Task<AuthResult> RefreshTokenAsync(string refreshToken);
        Task<bool> RevokeTokenAsync(string token);
    }
}