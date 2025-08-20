using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/driver-movements")]

    public class DriverMovementHistoryController : ControllerBase
    {
        private readonly IRepository<DriverMovementHistory> _repository;
        private readonly IMapper _mapper;
        private readonly IRepository<Driver> _driverRepository;
        private readonly IRepository<Vehicle> _vehicleRepository;
        private readonly IRepository<Trip> _tripRepository;

        public DriverMovementHistoryController(
            IRepository<DriverMovementHistory> repository,
            IMapper mapper,
            IRepository<Driver> driverRepository,
            IRepository<Vehicle> vehicleRepository,
            IRepository<Trip> tripRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _driverRepository = driverRepository;
            _vehicleRepository = vehicleRepository;
            _tripRepository = tripRepository;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Dispatcher")]
        public async Task<ActionResult<IEnumerable<DriverMovementHistoryDto>>> GetAll()
        {
            var movements = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<DriverMovementHistoryDto>>(movements));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Dispatcher,Driver")]
        public async Task<ActionResult<DriverMovementHistoryDto>> GetById(Guid id)
        {
            var movement = await _repository.GetByIdAsync(id);
            if (movement == null) return NotFound();
            return Ok(_mapper.Map<DriverMovementHistoryDto>(movement));
        }

        [HttpPost]
        [Authorize(Roles = "Driver,Admin")]
        public async Task<ActionResult<DriverMovementHistoryDto>> Create([FromBody] CreateDriverMovementHistoryDto dto)
        {
            // Validate relationships with proper predicate expressions
            if (!await _driverRepository.ExistsAsync(d => d.Id == dto.DriverId))
                return BadRequest("Driver not found");

            if (!await _vehicleRepository.ExistsAsync(v => v.Id == dto.VehicleId))
                return BadRequest("Vehicle not found");

            if (!await _tripRepository.ExistsAsync(t => t.Id == dto.TripId))
                return BadRequest("Trip not found");

            var movement = _mapper.Map<DriverMovementHistory>(dto);
            await _repository.AddAsync(movement);

            return CreatedAtAction(nameof(GetById), new { id = movement.Id },
                _mapper.Map<DriverMovementHistoryDto>(movement));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateDriverMovementHistoryDto dto)
        {
            var movement = await _repository.GetByIdAsync(id);
            if (movement == null) return NotFound();

            _mapper.Map(dto, movement);
            await _repository.UpdateAsync(movement);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var movement = await _repository.GetByIdAsync(id);
            if (movement == null) return NotFound();

            await _repository.DeleteAsync(movement);
            return NoContent();
        }
    }
}