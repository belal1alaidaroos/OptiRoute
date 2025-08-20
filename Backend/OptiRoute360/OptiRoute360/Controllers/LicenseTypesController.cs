using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;
using AutoMapper;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/license-types")]
    [ApiController]
    [Authorize]
    public class LicenseTypesController : ControllerBase
    {
        private readonly IRepository<LicenseType> _repository;
        private readonly IMapper _mapper;

        public LicenseTypesController(IRepository<LicenseType> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LicenseTypeDto>>> GetAll()
        {
            var items = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<LicenseTypeDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LicenseTypeDto>> GetById(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            return Ok(_mapper.Map<LicenseTypeDto>(entity));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<LicenseTypeDto>> Create([FromBody] CreateLicenseTypeDto dto)
        {
            var entity = _mapper.Map<LicenseType>(dto);
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = entity.Id, version = "1.0" }, _mapper.Map<LicenseTypeDto>(entity));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateLicenseTypeDto dto)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            _mapper.Map(dto, entity);
            await _repository.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            await _repository.DeleteAsync(entity);
            return NoContent();
        }
    }
}

