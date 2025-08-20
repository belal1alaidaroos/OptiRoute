namespace OptiRoute360.Services
{
    public interface INotificationService
    {
        Task SendGlobalNotification(GlobalNotification notification);
    }
}
