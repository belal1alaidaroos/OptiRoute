using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;
using AutoMapper;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/maintenance-types")]
    [ApiController]
    [Authorize]
    public class MaintenanceTypesController : ControllerBase
    {
        private readonly IRepository<MaintenanceType> _repository;
        private readonly IMapper _mapper;

        public MaintenanceTypesController(IRepository<MaintenanceType> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceTypeDto>>> GetAll()
        {
            var items = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<MaintenanceTypeDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaintenanceTypeDto>> GetById(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            return Ok(_mapper.Map<MaintenanceTypeDto>(entity));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<MaintenanceTypeDto>> Create([FromBody] CreateMaintenanceTypeDto dto)
        {
            var entity = _mapper.Map<MaintenanceType>(dto);
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = entity.Id, version = "1.0" }, _mapper.Map<MaintenanceTypeDto>(entity));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateMaintenanceTypeDto dto)
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

