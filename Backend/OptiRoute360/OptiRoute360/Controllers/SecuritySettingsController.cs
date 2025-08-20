using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/security-settings")]
    [Authorize(Roles = "Admin")]

    public class SecuritySettingsController : ControllerBase
    {
        private readonly IRepository<SecuritySettings> _repository;
        private readonly IMapper _mapper;

        public SecuritySettingsController(IRepository<SecuritySettings> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<SecuritySettingsDto>> Get()
        {
            var settings = await _repository.GetAllAsync();
            return Ok(_mapper.Map<SecuritySettingsDto>(settings.FirstOrDefault()));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateSecuritySettingsDto dto)
        {
            var existing = (await _repository.GetAllAsync()).FirstOrDefault();
            if (existing == null)
            {
                var newSettings = _mapper.Map<SecuritySettings>(dto);
                await _repository.AddAsync(newSettings);
                return CreatedAtAction(nameof(Get), null);
            }

            _mapper.Map(dto, existing);
            await _repository.UpdateAsync(existing);
            return NoContent();
        }
    }
}