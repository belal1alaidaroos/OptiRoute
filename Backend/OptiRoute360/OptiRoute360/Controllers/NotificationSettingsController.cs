using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using OptiRoute360.Services;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/notification-settings")]

    public class NotificationSettingsController : ControllerBase
    {
        private readonly IRepository<NotificationSettings> _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public NotificationSettingsController(
            IRepository<NotificationSettings> repository,
            IMapper mapper,
            ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<ActionResult<NotificationSettingsDto>> GetUserSettings()
        {
            var userId = _currentUserService.UserId;
            var settings = await _repository.GetAsync(s => s.Id == userId);
            return Ok(_mapper.Map<NotificationSettingsDto>(settings.FirstOrDefault() ?? new NotificationSettings { Id = userId }));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserSettings([FromBody] UpdateNotificationSettingsDto dto)
        {
            var userId = _currentUserService.UserId;
            var existing = (await _repository.GetAsync(s => s.Id == userId)).FirstOrDefault();

            if (existing == null)
            {
                var newSettings = _mapper.Map<NotificationSettings>(dto);
                newSettings.Id = userId;
                await _repository.AddAsync(newSettings);
                return CreatedAtAction(nameof(GetUserSettings), null);
            }

            _mapper.Map(dto, existing);
            await _repository.UpdateAsync(existing);
            return NoContent();
        }
    }
}