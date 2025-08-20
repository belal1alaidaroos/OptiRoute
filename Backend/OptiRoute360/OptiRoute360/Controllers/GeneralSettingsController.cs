using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;
using OptiRoute360.Services;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/general-settings")]

    public class GeneralSettingsController : ControllerBase
    {
        private readonly IRepository<GeneralSettings> _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GeneralSettingsController(
            IRepository<GeneralSettings> repository,
            IMapper mapper,
            ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        [HttpGet]

        public async Task<ActionResult<GeneralSettingsDto>> Get()
        {
            var settings = await _repository.GetAsync(filter: s => s.IsDeleted == null || s.IsDeleted == false);
            var result = settings.FirstOrDefault();
            if (result == null)
                return NotFound();

            return Ok(_mapper.Map<GeneralSettingsDto>(result));
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateGeneralSettingsDto dto)
        {
            var existing = (await _repository.GetAllAsync()).FirstOrDefault();
            if (existing == null)
            {
                var newSettings = _mapper.Map<GeneralSettings>(dto);
                await _repository.AddAsync(newSettings);
                return CreatedAtAction(nameof(Get), null);
            }

            _mapper.Map(dto, existing);
            await _repository.UpdateAsync(existing);
            return NoContent();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            var existing = (await _repository.GetAsync(filter: s => s.IsDeleted == null || s.IsDeleted == false)).FirstOrDefault();
            if (existing == null)
                return NotFound();

            existing.IsDeleted = true;
            existing.DeletedBy = _currentUserService.UserId;
            existing.DeletedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(existing);
            return NoContent();
        }

    }
}