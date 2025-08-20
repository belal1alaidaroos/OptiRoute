using System.ComponentModel.DataAnnotations;

namespace OptiRoute360.Data.Entities
{
    public class SystemEntity : BaseEntity
    {
        [Required, MaxLength(100)]
        public Guid EntityId { get; set; } // TableId

        [Required, MaxLength(100)]
        public string EntityName { get; set; } // TableName

        [MaxLength(100)]
        public string Module { get; set; } // Grouping
    }
}