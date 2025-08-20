namespace OptiRoute360.Services
{
    public interface IFileStorageService
    {
        Task<string> SaveFileAsync(IFormFile file);
        Task<Stream> GetFileAsync(string filePath);
        Task DeleteFileAsync(string filePath);
    }
}
