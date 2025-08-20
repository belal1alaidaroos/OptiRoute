namespace OptiRoute360.Models.Interfaces
{

    //public interface ITenantEntity<T> where T : IEquatable<T>
    //{
    //    T TenantId { get; set; }
    //}
    public interface ITenantEntity
    {
        Guid TenantId { get; set; }
    }
}
