using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OptiRoute360.Services;
using Asp.Versioning;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/global-notifications")]
    [ApiController]
    public class GlobalNotificationsController : ControllerBase
    {
        private readonly IRepository<GlobalNotification> _repository;
        private readonly IMapper _mapper;
        private readonly INotificationService _notificationService;
        private readonly ICurrentUserService _currentUserService;

        public GlobalNotificationsController(
            IRepository<GlobalNotification> repository,
            IMapper mapper,
            INotificationService notificationService,
            ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _notificationService = notificationService;
            _currentUserService = currentUserService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<GlobalNotificationDto>>> GetAll(
            [FromQuery] string type = null,
            [FromQuery] string priority = null)
        {
            var notifications = await _repository.GetAsync(
                filter: n =>
                    (n.IsDeleted == null || n.IsDeleted == false) &&  // Soft Delete Filter
                    (type == null || n.Type == type) &&
                    (priority == null || n.Priority == priority),
                orderBy: q => q.OrderByDescending(n => n.CreatedAt));

            return Ok(_mapper.Map<IEnumerable<GlobalNotificationDto>>(notifications));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<GlobalNotificationDto>> GetById(Guid id)
        {
            var notification = await _repository.GetByIdAsync(id);
            if (notification == null || notification.IsDeleted == true)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<GlobalNotificationDto>(notification));
        }

        [HttpPost]
        public async Task<ActionResult<GlobalNotificationDto>> Create([FromBody] CreateGlobalNotificationDto dto)
        {
            var notification = _mapper.Map<GlobalNotification>(dto);
            notification.CreatedAt = DateTime.UtcNow;
            notification.Status = "Active";

            await _repository.AddAsync(notification);
            await _notificationService.SendGlobalNotification(notification);

            return CreatedAtAction(nameof(GetById), new { id = notification.Id }, _mapper.Map<GlobalNotificationDto>(notification));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var notification = await _repository.GetByIdAsync(id);
            if (notification == null)
                return NotFound();

            notification.IsDeleted = true;
            notification.DeletedBy = _currentUserService.UserId;
            notification.DeletedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(notification);
            return NoContent();
        }


    }
}