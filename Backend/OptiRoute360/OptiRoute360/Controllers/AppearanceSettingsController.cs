using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/appearance-settings")]

    public class AppearanceSettingsController : ControllerBase
    {
        private readonly IRepository<AppearanceSettings> _repository;
        private readonly IMapper _mapper;

        public AppearanceSettingsController(IRepository<AppearanceSettings> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<AppearanceSettingsDto>> GetSingleAppearanceSettings()
        {
            var settings = await _repository.GetAllAsync();
            var setting = settings.FirstOrDefault();

            if (setting == null)
                return NotFound();

            return Ok(_mapper.Map<AppearanceSettingsDto>(setting));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateAppearanceSettingsDto dto)
        {
            var existing = (await _repository.GetAllAsync()).FirstOrDefault();
            if (existing == null) return NotFound();

            _mapper.Map(dto, existing);
            await _repository.UpdateAsync(existing);
            return NoContent();
        }

    }
}