using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OptiRoute360.DTOs.User;
using OptiRoute360.Services.Auth;
using OptiRoute360.Services.User;
using OptiRoute360.Models.Identity;
using OptiRoute360.DTOs.Auth;
using OptiRoute360.Services;


namespace OptiRoute360.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IPermissionService _permissionService;
        private readonly IAppearanceService _appearanceService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            IPermissionService permissionService,
            IAppearanceService appearanceService,
            TokenService tokenService,
            IMapper mapper)
        {
            _userManager = userManager;
            _permissionService = permissionService;
            _appearanceService = appearanceService;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // 1. Validate input
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // 2. Find user by email
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                return Unauthorized(new { Message = "Invalid credentials" });

            // 3. Verify password
            var passwordValid = await _userManager.CheckPasswordAsync(user, request.Password);
            if (!passwordValid)
                return Unauthorized(new { Message = "Invalid credentials" });

            // 4. Get user roles and permissions
           //var roles = await _userManager.GetRolesAsync(user);
            var roles = (await _userManager.GetRolesAsync(user)).ToList();


            var permissions = await _permissionService.GetMergedPermissions(user.Id);

            // 5. Get appearance settings
            var appearance = await _appearanceService.GetUserAppearance(user.Id)
                            ?? new AppearanceSettings(); // Default settings

            // 6. Generate JWT token
            var userDto = new UserDto
            {
                Id = user.Id,
                //FirstName = user.Name,
                FullName = user.FullName,
                Email = user.Email,
                Phone = user.Phone,
                Department = user.Department,
                JoinDate = user.JoinDate,
                LastLogin = user.LastLogin,
                //Avatar = user.Avatar,
                IsActive = user.IsActive,
                TenantId = user.TenantId
            };
 
            var token = _tokenService.GenerateToken(userDto, roles, permissions, appearance);

            // 7. Return response
            return Ok(new LoginResponse
            {
                Token = token,
                User = _mapper.Map<UserDto>(user),
                Appearance = _mapper.Map<AppearanceSettingsDto>(appearance)
            });
        }
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var principal = _tokenService.GetPrincipalFromExpiredToken(request.Token);
            if (principal == null)
                return Unauthorized(new { Message = "Invalid token" });

            var userId = principal.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return Unauthorized(new { Message = "Invalid token" });

            var roles = await _userManager.GetRolesAsync(user);
            var permissions = await _permissionService.GetMergedPermissions(user.Id);
            var appearance = await _appearanceService.GetUserAppearance(user.Id) ?? new AppearanceSettings();

            var userDto = _mapper.Map<UserDto>(user);
            var newToken = _tokenService.GenerateToken(userDto, roles.ToList(), permissions, appearance);

            return Ok(new { Token = newToken });
        }
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            if (user == null)
                return NotFound();

            var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return NoContent();
        }


    }
}