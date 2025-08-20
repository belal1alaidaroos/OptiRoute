using System.Security.Claims;

namespace OptiRoute360.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetTenantId(this ClaimsPrincipal principal)
        {
            var tenantIdClaim = principal.FindFirst("TenantId")
                ?? principal.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid");

            if (tenantIdClaim == null || !Guid.TryParse(tenantIdClaim.Value, out var tenantId))
            {
                throw new UnauthorizedAccessException("Tenant ID claim is missing or invalid");
            }

            return tenantId;
        }

        public static Guid GetUserId(this ClaimsPrincipal principal)
        {
            var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier)
                ?? principal.FindFirst("sub");

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                throw new UnauthorizedAccessException("User ID claim is missing or invalid");
            }

            return userId;
        }
    }
}