using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;
using AutoMapper;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/tracking")]
    [ApiController]
    [Authorize]
    public class TrackingController : ControllerBase
    {
        private readonly IRepository<Tracking> _repository;
        private readonly IMapper _mapper;

        public TrackingController(IRepository<Tracking> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tracking>>> GetAll()
        {
            var items = await _repository.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tracking>> GetById(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            return Ok(entity);
        }

        [HttpPost]
        public async Task<ActionResult<Tracking>> Create([FromBody] Tracking entity)
        {
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = entity.Id, version = "1.0" }, entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Tracking update)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();

            entity.TripId = update.TripId;
            entity.Status = update.Status;
            entity.Progress = update.Progress;
            entity.DriverId = update.DriverId;
            entity.HubId = update.HubId;
            entity.PeriodId = update.PeriodId;
            entity.StartTime = update.StartTime;
            entity.EndTime = update.EndTime;
            entity.DeliveredPackages = update.DeliveredPackages;
            entity.TotalPackages = update.TotalPackages;
            entity.Locations = update.Locations;
            await _repository.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            await _repository.DeleteAsync(entity);
            return NoContent();
        }
    }
}

