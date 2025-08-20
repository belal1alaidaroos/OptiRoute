using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using OptiRoute360.Data;
using OptiRoute360.Data.Entities;
using OptiRoute360.DTOs.User;
using OptiRoute360.Models.Auth;
using OptiRoute360.Services.User;
using System.Security.Cryptography;

namespace OptiRoute360.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenService _tokenService;
        private readonly IPermissionService _permissionService;
        private readonly IAppearanceService _appearanceService;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(
            IPasswordHasher passwordHasher,
            ITokenService tokenService,
            IPermissionService permissionService,
            IAppearanceService appearanceService,
            ApplicationDbContext context,
            IConfiguration config)
        {
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
            _permissionService = permissionService;
            _appearanceService = appearanceService;
            _context = context;
            _config = config;
        }

        public async Task<AuthResult> AuthenticateAsync(LoginRequest request)
        {
            // 1. Find user with included roles
            var user = await _context.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
                return AuthResult.Failure("Invalid credentials");

            // 2. Verify password
            if (!_passwordHasher.VerifyPassword(request.Password, user.PasswordHash, user.Salt))
                return AuthResult.Failure("Invalid credentials");

            // 3. Check if active
            if (!user.IsActive)
                return AuthResult.Failure("Account is disabled", 403);

            // 4. Get user roles
            var roles = user.UserRoles
                .Select(ur => ur.Role.Name)
                .ToList();

            // 5. Get permissions and appearance in parallel
            var userId = user.Id;
            var permissionsTask = _permissionService.GetMergedPermissions(userId);
            var appearanceTask = _appearanceService.GetUserAppearance(userId);

            await Task.WhenAll(permissionsTask, appearanceTask);

            var permissions = await permissionsTask;
            var appearance = await appearanceTask;


            // 6. Prepare user DTO
            var userDto = new UserDto
            {
                Id = user.Id,
                FullName = user.UserName,// ?? $"{user.FirstName} {user.LastName}".Trim(),
                Email = user.Email,
                Phone = user.PhoneNumber,
                Department = user.Department,
                JoinDate = user.JoinDate,
                LastLogin = user.LastLogin,
                IsActive = user.IsActive,
                TenantId = user.TenantId
            };

            // 7. Generate tokens
            var token = _tokenService.GenerateToken(
                userDto,
                roles,
                permissions,
                appearance ?? new AppearanceSettings()
            );

            var refreshToken = GenerateRefreshToken();
            var tokenExpiry = DateTime.UtcNow.AddHours(
                _config.GetValue<double>("Jwt:ExpireHours"));

            // 8. Update user
            user.LastLogin = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            // 9. Return result
            return AuthResult.SuccessWithUser(
                token,
                refreshToken,
                tokenExpiry,
                userDto,
                new AppearanceSettingsDto
                {
                    ColorScheme = appearance?.ColorScheme,
                    PrimaryColor = appearance?.PrimaryColor,
                    Language = appearance?.Language,
                    Timezone = appearance?.Timezone
                },
                permissions
            );
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public async Task<AuthResult> RefreshTokenAsync(string refreshToken)
        {
            // 1. Validate Refresh Token exists in DB (Optional: Depends if you store refresh tokens in DB)
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.SecurityStamp == refreshToken);

            if (user == null)
                return AuthResult.Failure("Invalid Refresh Token", 401);

            if (!user.IsActive)
                return AuthResult.Failure("Account is disabled", 403);

            // 2. Load User Roles
            var roles = await _context.UserRoles
                .Where(ur => ur.UserId == user.Id)
                .Select(ur => ur.Role.Name)
                .ToListAsync();

            // 3. Get Permissions and Appearance
            var permissions = await _permissionService.GetMergedPermissions(user.Id);
            var appearance = await _appearanceService.GetUserAppearance(user.Id);

            // 4. Generate new JWT Token
            var userDto = new UserDto
            {
                Id = user.Id,
                FullName = user.UserName,
                Email = user.Email,
                Phone = user.PhoneNumber,
                Department = user.Department,
                JoinDate = user.JoinDate,
                LastLogin = user.LastLogin,
                IsActive = user.IsActive,
                TenantId = user.TenantId
            };

            var token = _tokenService.GenerateToken(
                userDto,
                roles,
                permissions,
                appearance ?? new AppearanceSettings()
            );

            var newRefreshToken = GenerateRefreshToken();
            var tokenExpiry = DateTime.UtcNow.AddHours(
                _config.GetValue<double>("Jwt:ExpireHours"));

            // Optional: Update RefreshToken in DB (if you're storing it)
            user.SecurityStamp = newRefreshToken;
            await _context.SaveChangesAsync();

            return AuthResult.SuccessWithUser(
                token,
                newRefreshToken,
                tokenExpiry,
                userDto,
                new AppearanceSettingsDto
                {
                    ColorScheme = appearance?.ColorScheme,
                    PrimaryColor = appearance?.PrimaryColor,
                    Language = appearance?.Language,
                    Timezone = appearance?.Timezone
                },
                permissions
            );
        }


        public async Task<bool> RevokeTokenAsync(string token)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.SecurityStamp == token);

            if (user == null)
                return false;

            // Invalidate Refresh Token by regenerating SecurityStamp
            user.SecurityStamp = Guid.NewGuid().ToString();
            await _context.SaveChangesAsync();

            return true;
        }

    }
}