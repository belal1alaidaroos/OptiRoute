using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using OptiRoute360.Services;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/notifications-center")]

    public class NotificationsCenterController : ControllerBase
    {
        private readonly IRepository<NotificationCenter> _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public NotificationsCenterController(
            IRepository<NotificationCenter> repository,
            IMapper mapper,
            ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

    //    [HttpGet]
    //    public async Task<ActionResult<NotificationsCenterDto>> GetUserNotifications()
    //    {
    //        var userId = _currentUserService.UserId;
    //        var center = await _repository.GetAsync(
    //            filter: nc => nc.Id == userId,
    //            includes: new[] { nameof(NotificationCenter.Notifications) });

    //        if (center == null)
    //        {
    //            center = new NotificationCenter { UserId = userId };
    //            await _repository.AddAsync(center);
    //        }

    //        return Ok(_mapper.Map<NotificationsCenterDto>(center));
    //    }

    //    [HttpPost("mark-as-read")]
    //    public async Task<IActionResult> MarkAsRead([FromBody] MarkNotificationsReadDto dto)
    //    {
    //        var userId = _currentUserService.UserId;
    //        var center = await _repository.GetAsync(
    //            filter: nc => nc.Id == userId,
    //            includes: new[] { nameof(NotificationCenter.Notifications) });

    //        if (center == null) return NotFound();

    //        foreach (var notification in center.Notifications.Where(n => dto.NotificationIds.Contains(n.Id)))
    //        {
    //            notification.Status = "Read";
    //        }

    //        await _repository.UpdateAsync(center);
    //        return NoContent();
    //    }
    //
    }
}