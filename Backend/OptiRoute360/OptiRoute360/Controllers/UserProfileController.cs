using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using OptiRoute360.Data.Repositories;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/user-profile")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IRepository<UserProfile> _repository;
        private readonly IMapper _mapper;

        public UserProfileController(IRepository<UserProfile> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserProfileDto>> GetById(Guid id)
        {
            var profile = await _repository.GetByIdAsync(id);
            if (profile == null) return NotFound();
            return Ok(_mapper.Map<UserProfileDto>(profile));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserProfileDto dto)
        {
            var profile = await _repository.GetByIdAsync(id);
            if (profile == null) return NotFound();
            _mapper.Map(dto, profile);
            await _repository.UpdateAsync(profile);
            return NoContent();
        }
    }
}

