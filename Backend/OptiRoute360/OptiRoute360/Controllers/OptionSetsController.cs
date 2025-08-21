using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;
using AutoMapper;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/option-sets")]
    [ApiController]
    [Authorize]
    public class OptionSetsController : ControllerBase
    {
        private readonly IRepository<OptionSetValue> _repository;
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public OptionSetsController(IRepository<OptionSetValue> repository, ApplicationDbContext db, IMapper mapper)
        {
            _repository = repository;
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OptionSetValue>>> GetAll()
        {
            var items = await _repository.GetAllAsync();
            return Ok(items);
        }

        // GET api/v1/option-sets/effective?name=Priority&ownerEntity=Vehicle&ownerId=...&active=true
        [HttpGet("effective")]
        public async Task<ActionResult<IEnumerable<OptionSetValue>>> GetEffective(
            [FromQuery] string name,
            [FromQuery] string ownerEntity = null,
            [FromQuery] Guid? ownerId = null,
            [FromQuery] bool active = true)
        {
            if (string.IsNullOrWhiteSpace(name)) return BadRequest("Missing option set name");

            var tenantId = HttpContext.RequestServices.GetRequiredService<ICurrentUserService>().GetTenantId();

            var baseQuery = _db.OptionSetValues.AsQueryable()
                .Where(o => o.OptionSetName == name)
                .Where(o => o.TenantId == tenantId || o.IsGeneral);

            if (active)
                baseQuery = baseQuery.Where(o => o.IsActive);

            var globals = baseQuery.Where(o => o.IsGeneral);
            var tenantLevel = baseQuery.Where(o => !o.IsGeneral && o.OwnerEntity == null && o.OwnerId == null);
            var entityLevel = ownerEntity == null ? Enumerable.Empty<OptionSetValue>().AsQueryable()
                : baseQuery.Where(o => o.OwnerEntity == ownerEntity && o.OwnerId == null);
            var recordLevel = ownerEntity != null && ownerId.HasValue ? baseQuery.Where(o => o.OwnerEntity == ownerEntity && o.OwnerId == ownerId)
                : Enumerable.Empty<OptionSetValue>().AsQueryable();

            var all = await globals
                .Union(tenantLevel)
                .Union(entityLevel)
                .Union(recordLevel)
                .OrderBy(o => o.SortOrder).ThenBy(o => o.Name)
                .ToListAsync();

            var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var effective = new List<OptionSetValue>();
            foreach (var o in all)
            {
                var key = (o.Code ?? o.Name ?? o.Id.ToString()).ToLowerInvariant();
                if (seen.Add(key)) effective.Add(o);
            }
            return Ok(effective);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OptionSetValue>> GetById(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            return Ok(entity);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<OptionSetValue>> Create([FromBody] OptionSetValue entity)
        {
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = entity.Id, version = "1.0" }, entity);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(Guid id, [FromBody] OptionSetValue update)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            entity.Name = update.Name;
            entity.OptionSetName = update.OptionSetName;
            entity.AlternativeName = update.AlternativeName;
            entity.Value = update.Value;
            entity.IsGeneral = update.IsGeneral;
            entity.IsActive = update.IsActive;
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

