using System.Security.Permissions;

namespace OptiRoute360.Middleware
{
    public class PermissionMiddleware
    {
        public async Task InvokeAsync(HttpContext context)
        {
            //to be checked
            //var endpoint = context.GetEndpoint();
            //var attribute = endpoint?.Metadata.GetMetadata<PermissionAttribute>();

            //if (attribute != null)
            //{
            //    var permissions = context.User.GetMergedPermissions();
            //    if (!permissions[attribute.Entity][attribute.Action])
            //    {
            //        context.Response.StatusCode = 403;
            //        return;
            //    }
            //}
            //await _next(context);
        }
    }
}
