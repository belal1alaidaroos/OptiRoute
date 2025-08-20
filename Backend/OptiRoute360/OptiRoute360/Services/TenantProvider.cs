using OptiRoute360.Models.Interfaces;

namespace OptiRoute360.Services
{
    public class TenantProvider : ITenantProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TenantProvider(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid GetTenantId()
        {
            // Get tenant ID from JWT claim
            var tenantId = _httpContextAccessor.HttpContext?
                .User?
                .FindFirst("tenantId")?
                .Value;

            return Guid.Parse(tenantId); // Convert string to Guid
        }
    }
}
