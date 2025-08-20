using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;
using AutoMapper;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/periods")]
    [ApiController]
    [Authorize]
    public class PeriodsController : ControllerBase
    {
        private readonly IRepository<Period> _repository;
        private readonly IMapper _mapper;

        public PeriodsController(IRepository<Period> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Period>>> GetAll()
        {
            var items = await _repository.GetAllAsync();
            return Ok(items);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Period>> Create([FromBody] Period entity)
        {
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = entity.Id, version = "1.0" }, entity);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Period>> GetById(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            return Ok(entity);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Period update)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            entity.Name = update.Name;
            entity.Code = update.Code;
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

