namespace OptiRoute360.Data.Entities
{
    public class RefreshToken : BaseEntity
    {
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? RevokedDate { get; set; }
        public string ReplacedByToken { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
