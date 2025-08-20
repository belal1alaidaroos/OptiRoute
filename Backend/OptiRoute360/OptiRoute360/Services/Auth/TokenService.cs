using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using System.Text;
using OptiRoute360.DTOs.User;
//
namespace OptiRoute360.Services.Auth
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public TokenService(IConfiguration config, IMapper mapper)
        {
            _config = config;
            _mapper = mapper;
        }

        public string GenerateToken(
            UserDto user,
            List<string> roles,
            Dictionary<string, EntityPermissions> permissions,
            AppearanceSettings appearance)
        {
            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("tenantId", user.TenantId.ToString()),
            new Claim("fullName", user.FullName),
 
        };

            // Add roles
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            // Serialize permissions and appearance
            claims.Add(new Claim("permissions", JsonSerializer.Serialize(permissions)));
            claims.Add(new Claim("appearance", JsonSerializer.Serialize(_mapper.Map<AppearanceSettingsDto>(appearance))));

            // Create token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityTokenHandler().WriteToken(
                new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(Convert.ToDouble(_config["Jwt:ExpireHours"])),
                    signingCredentials: creds
                )
            );

        }
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = _tokenValidationParameters.Clone();
            tokenValidationParameters.ValidateLifetime = false;  // Bypass expiry check

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                return null;

            return principal;
        }
        private readonly TokenValidationParameters _tokenValidationParameters;

        public TokenService(IConfiguration config, IMapper mapper, TokenValidationParameters tokenValidationParameters)
        {
            _config = config;
            _mapper = mapper;
            _tokenValidationParameters = tokenValidationParameters;
        }
       



    }
}
