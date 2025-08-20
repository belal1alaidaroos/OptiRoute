using OptiRoute360.Data.Entities;
using System.Security.Claims;

namespace OptiRoute360.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid UserId =>
            Guid.Parse(_httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? Guid.Empty.ToString());

        public Guid TenantId =>
            Guid.Parse(_httpContextAccessor.HttpContext?.User?.FindFirstValue("TenantId") ?? Guid.Empty.ToString());

        public string Email =>
            _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Email);

        public string Role =>
            _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Role);


    }


}
