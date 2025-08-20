namespace OptiRoute360.Models.Settings
{
    namespace OptiRoute360.Models.Settings
    {
        public class JwtSettings
        {
            public string Secret { get; set; }
            public int TokenLifetimeMinutes { get; set; } = 15;
            public int RefreshTokenLifetimeDays { get; set; } = 7;
        }
    }
}
