using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/trips")]

    public class TripsController : ControllerBase
    {
        private readonly IRepository<Trip> _tripRepository;
        private readonly IRepository<Driver> _driverRepository;
        private readonly IRepository<Vehicle> _vehicleRepository;
        private readonly IRepository<Hub> _hubRepository;
        private readonly IMapper _mapper;

        public TripsController(
            IRepository<Trip> tripRepository,
            IRepository<Driver> driverRepository,
            IRepository<Vehicle> vehicleRepository,
            IRepository<Hub> hubRepository,
            IMapper mapper)
        {
            _tripRepository = tripRepository;
            _driverRepository = driverRepository;
            _vehicleRepository = vehicleRepository;
            _hubRepository = hubRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetAllTrips(
            [FromQuery] string status = null,
            [FromQuery] Guid? driverId = null,
            [FromQuery] DateTime? startDate = null)
        {
            var trips = await _tripRepository.GetAsync(
                filter: t =>
                    (status == null || t.Status == status) &&
                    (!driverId.HasValue || t.DriverId == driverId.Value) &&
                    (!startDate.HasValue || t.StartDate.Date == startDate.Value.Date),
                includes: new[] { nameof(Trip.Driver), nameof(Trip.Vehicle), nameof(Trip.StartHub), nameof(Trip.EndHub) });
            return Ok(_mapper.Map<IEnumerable<TripDto>>(trips));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> GetTrip(Guid id)
        {
            var trip = await _tripRepository.GetByIdAsync(id,
                includes: new[] { nameof(Trip.Driver), nameof(Trip.Vehicle), nameof(Trip.StartHub), nameof(Trip.EndHub) });
            if (trip == null) return NotFound();
            return Ok(_mapper.Map<TripDto>(trip));
        }

        [HttpPost]
        public async Task<ActionResult<TripDto>> CreateTrip([FromBody] CreateTripDto dto)
        {
            if (!await _driverRepository.ExistsAsync(d => d.Id == dto.DriverId))
                return BadRequest("Invalid Driver ID");

            if (!await _vehicleRepository.ExistsAsync(v => v.Id == dto.VehicleId))
                return BadRequest("Invalid Vehicle ID");

            if (!await _hubRepository.ExistsAsync(h => h.Id == dto.StartHubId))
                return BadRequest("Invalid Start Hub ID");

            if (!await _hubRepository.ExistsAsync(h => h.Id == dto.EndHubId))
                return BadRequest("Invalid End Hub ID");

            var trip = _mapper.Map<Trip>(dto);
            trip.TripNumber = $"TRP-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 4).ToUpper()}";
            trip.Status = "Scheduled";

            await _tripRepository.AddAsync(trip);
            return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, _mapper.Map<TripDto>(trip));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrip(Guid id, [FromBody] UpdateTripDto dto)
        {
            var trip = await _tripRepository.GetByIdAsync(id);
            if (trip == null) return NotFound();

            if (dto.DriverId.HasValue && !await _driverRepository.ExistsAsync(d => d.Id == dto.DriverId.Value))
                return BadRequest("Invalid Driver ID");

            if (dto.VehicleId.HasValue && !await _vehicleRepository.ExistsAsync(v => v.Id == dto.VehicleId.Value))
                return BadRequest("Invalid Vehicle ID");

            _mapper.Map(dto, trip);
            await _tripRepository.UpdateAsync(trip);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(Guid id)
        {
            await _tripRepository.DeleteAsync(id);
            return NoContent();
        }

        [HttpPost("{id}/start")]
        public async Task<IActionResult> StartTrip(Guid id)
        {
            var trip = await _tripRepository.GetByIdAsync(id);
            if (trip == null) return NotFound();
            if (trip.Status != "Scheduled")
                return BadRequest("Only scheduled trips can be started");

            trip.Status = "In Progress";
            trip.StartDate = DateTime.UtcNow;

            await _tripRepository.UpdateAsync(trip);
            return NoContent();
        }

        [HttpPost("{id}/complete")]
        public async Task<IActionResult> CompleteTrip(Guid id, [FromBody] CompleteTripDto dto)
        {
            var trip = await _tripRepository.GetByIdAsync(id);
            if (trip == null) return NotFound();
            if (trip.Status != "In Progress")
                return BadRequest("Only in-progress trips can be completed");

            trip.Status = "Completed";
            trip.EndDate = DateTime.UtcNow;
            trip.Distance = dto.Distance;
            trip.Duration = dto.Duration;

            await _tripRepository.UpdateAsync(trip);
            return NoContent();
        }
    }
}