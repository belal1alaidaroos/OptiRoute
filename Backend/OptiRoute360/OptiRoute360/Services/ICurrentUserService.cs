namespace OptiRoute360.Services
{
    public interface ICurrentUserService
    {
        Guid UserId { get; }
        Guid TenantId { get; }
        string Email { get; }
        string Role { get; }
    }
}
