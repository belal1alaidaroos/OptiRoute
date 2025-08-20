using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using OptiRoute360.Services.Auth;
using System.Security.Claims;
using System.Text.Json;
using System.Text;
using OptiRoute360.DTOs.User;
//using System.IdentityModel.Tokens.Jwt;

namespace OptiRoute360.Services
{
    public interface ITokenService
    {
        string GenerateToken(UserDto  user, List<string> roles,
            Dictionary<string, EntityPermissions> permissions,
            AppearanceSettings appearance);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }

}