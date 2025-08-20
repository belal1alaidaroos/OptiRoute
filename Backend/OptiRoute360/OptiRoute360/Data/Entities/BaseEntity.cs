namespace OptiRoute360.Data.Entities
{
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }          
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public Guid CreatedBy { get; set; }
        public Guid? DeletedBy { get; set; }
        public Guid? ModifiedBy { get; set; }   
        public Guid TenantId { get; set; }  // or int if you're using integers
        public bool? IsDeleted { get; set; } = false;

        //public TenantManagement Tenant { get; set; }   // Navigation property


    }
}
