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
            var requests = await _repository.GetAsync(
                filter: sr =>
                    (status == null || sr.Status == status) &&
                    (!vehicleId.HasValue || sr.VehicleId == vehicleId.Value),
                includes: new[] { nameof(ServicesRequest.Vehicle), nameof(ServicesRequest.Workshop) });
            return Ok(_mapper.Map<IEnumerable<ServicesRequestDto>>(requests));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServicesRequestDto>> GetById(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id,
                includes: new[] { nameof(ServicesRequest.Vehicle), nameof(ServicesRequest.Workshop) });
            if (entity == null) return NotFound();
            return Ok(_mapper.Map<ServicesRequestDto>(entity));
        }

        [HttpPost]
        public async Task<ActionResult<ServicesRequestDto>> Create([FromBody] CreateServicesRequestDto dto)
        {
            if (!await _vehicleRepository.ExistsAsync(v => v.Id == dto.VehicleId))
                return BadRequest("Invalid Vehicle ID");
            if (!await _workshopRepository.ExistsAsync(w => w.Id == dto.WorkshopId))
                return BadRequest("Invalid Workshop ID");

            var entity = _mapper.Map<ServicesRequest>(dto);
            entity.Status = entity.Status ?? "Pending";

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

            if (dto.VehicleId != Guid.Empty && !await _vehicleRepository.ExistsAsync(v => v.Id == dto.VehicleId))
                return BadRequest("Invalid Vehicle ID");
            if (dto.WorkshopId != Guid.Empty && !await _workshopRepository.ExistsAsync(w => w.Id == dto.WorkshopId))
                return BadRequest("Invalid Workshop ID");

            // Map updatable fields
            entity.ServiceType = dto.ServiceType;
            entity.VehicleId = dto.VehicleId;
            entity.WorkshopId = dto.WorkshopId;
            entity.Date = dto.Date;
            entity.Priority = dto.Priority;

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

            request.Status = "Approved";
            await _repository.UpdateAsync(request);

            return NoContent();
        }
    }
}