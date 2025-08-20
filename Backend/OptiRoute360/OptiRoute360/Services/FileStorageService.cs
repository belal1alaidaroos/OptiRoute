namespace OptiRoute360.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly string _storagePath;

        public FileStorageService(IConfiguration configuration)
        {
            _storagePath = configuration["FileStorage:Path"] ?? Path.Combine(Directory.GetCurrentDirectory(), "FileStorage");

            if (!Directory.Exists(_storagePath))
            {
                Directory.CreateDirectory(_storagePath);
            }
        }

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(_storagePath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        public Task<Stream> GetFileAsync(string filePath)
        {
            var fullPath = Path.Combine(_storagePath, filePath);
            return Task.FromResult<Stream>(File.OpenRead(fullPath));
        }

        public Task DeleteFileAsync(string filePath)
        {
            var fullPath = Path.Combine(_storagePath, filePath);
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
            return Task.CompletedTask;
        }
    }

}
