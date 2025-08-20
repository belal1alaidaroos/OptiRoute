using Microsoft.AspNetCore.Identity;
using OptiRoute360.Models.Interfaces;
using System.Security.Cryptography;

namespace OptiRoute360.Services
{
    public class PasswordHasher : IPasswordHasher
    {
        private const int Iterations = 10000;
        private const int SaltSize = 32;
        private const int HashSize = 32;
        public (string Hash, string Salt) HashPassword(string password)
        {
            var salt = GenerateSalt();
            var hash = ComputeHash(password, salt);
            return (hash, salt);
        }

        public bool VerifyPassword(string password, string hash, string salt)
        {
            var computedHash = ComputeHash(password, salt);
            return hash == computedHash;
        }

        private string GenerateSalt()
        {
            var saltBytes = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(saltBytes);
            return Convert.ToBase64String(saltBytes);
        }

        private string ComputeHash(string password, string salt)
        {
            var saltBytes = Convert.FromBase64String(salt);

            using var pbkdf2 = new Rfc2898DeriveBytes(
                password,
                saltBytes,
                10000,
                HashAlgorithmName.SHA256);

            var hashBytes = pbkdf2.GetBytes(32);
            return Convert.ToBase64String(hashBytes);
        }
    }
}
