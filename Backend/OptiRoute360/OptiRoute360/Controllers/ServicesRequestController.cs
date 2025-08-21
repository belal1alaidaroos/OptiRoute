using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/services-requests")]

    public class ServicesRequestController : ControllerBase
    {
        private readonly IRepository<ServicesRequest> _repository;
        private readonly IRepository<Vehicle> _vehicleRepository;
        private readonly IRepository<Workshop> _workshopRepository;
        private readonly IMapper _mapper;

        public ServicesRequestController(
            IRepository<ServicesRequest> repository,
            IRepository<Vehicle> vehicleRepository,
            IRepository<Workshop> workshopRepository,
            IMapper mapper)
        {
            _repository = repository;
            _vehicleRepository = vehicleRepository;
            _workshopRepository = workshopRepository;
            _mapper = mapper;
        }

        

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServicesRequestDto>>> GetAll(
            [FromQuery] string status = null,
            [FromQuery] Guid? vehicleId = null)
        {
            var requests = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<ServicesRequestDto>>(requests));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServicesRequestDto>> GetById(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            return Ok(_mapper.Map<ServicesRequestDto>(entity));
        }

        [HttpPost]
        public async Task<ActionResult<ServicesRequestDto>> Create([FromBody] CreateServicesRequestDto dto)
        {
            var entity = _mapper.Map<ServicesRequest>(dto);

            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();

            var created = _mapper.Map<ServicesRequestDto>(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id, version = "1.0" }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateServicesRequestDto dto)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();

            // Nothing to update based on current simplified model; accept and no-op or map allowed fields

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

        [HttpPost("approve/{id}")]
        public async Task<IActionResult> ApproveRequest(Guid id)
        {
            var request = await _repository.GetByIdAsync(id);
            if (request == null) return NotFound();

            // No Status field in current model; accept and no-op
            await _repository.UpdateAsync(request);

            return NoContent();
        }
    }
}