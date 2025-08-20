using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;
using AutoMapper;
using OptiRoute360.Services;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;
using LinqKit;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/drivers")]
    [ApiController]
    [Authorize]
    public class DriversController : ControllerBase
    {
        private readonly IRepository<Driver> _driverRepository;
        private readonly IRepository<LicenseType> _licenseTypeRepository;
        private readonly IRepository<VehicleType> _vehicleTypeRepository;
        private readonly IRepository<Hub> _hubRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public DriversController(
            IRepository<Driver> driverRepository,
            IRepository<LicenseType> licenseTypeRepository,
            IRepository<VehicleType> vehicleTypeRepository,
            IRepository<Hub> hubRepository,
            IMapper mapper,
            ICurrentUserService currentUserService)
        {
            _driverRepository = driverRepository;
            _licenseTypeRepository = licenseTypeRepository;
            _vehicleTypeRepository = vehicleTypeRepository;
            _hubRepository = hubRepository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverDto>>> GetAllDrivers(
            [FromQuery] string status = null,
            [FromQuery] Guid? hubId = null)
        {
            // Start with base predicate
             var predicate = PredicateBuilder.New<Driver>(d => !d.IsDeleted.GetValueOrDefault());

            // Add optional filters
            if (!string.IsNullOrEmpty(status))
            {
                predicate = predicate.And(d => d.Status == status);
            }

            if (hubId.HasValue)
            {
                predicate = predicate.And(d => d.HubId == hubId.Value);
            }

            var drivers = await _driverRepository.GetAsync(
                predicate,
                includes: new[] {
                    nameof(Driver.LicenseType),
                    nameof(Driver.VehicleType),
                    nameof(Driver.Hub)
                });

            return Ok(_mapper.Map<IEnumerable<DriverDto>>(drivers));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DriverDto>> GetDriverById(Guid id)
        {
            var driver = await _driverRepository.GetByIdAsync(id,
                includes: new[] {
                    nameof(Driver.LicenseType),
                    nameof(Driver.VehicleType),
                    nameof(Driver.Hub)
                });
            if (driver == null || driver.IsDeleted.GetValueOrDefault())
                 return NotFound();

            return Ok(_mapper.Map<DriverDto>(driver));
        }

        [HttpPost]
        public async Task<ActionResult<DriverDto>> CreateDriver([FromBody] CreateDriverDto createDto)
        {
            // Validate related entities exist
            if (!await _licenseTypeRepository.ExistsAsync(lt => lt.Id == createDto.LicenseTypeId))
                return BadRequest("Invalid license type ID");

            if (!await _vehicleTypeRepository.ExistsAsync(vt => vt.Id == createDto.VehicleTypeId))
                return BadRequest("Invalid vehicle type ID");

            if (!await _hubRepository.ExistsAsync(h => h.Id == createDto.HubId))
                return BadRequest("Invalid hub ID");

            var driver = _mapper.Map<Driver>(createDto);
            driver.JoinDate = DateTime.UtcNow;
            driver.CreatedBy = _currentUserService.UserId;
            driver.Trips = 0;
            driver.Rating = 0;

            await _driverRepository.AddAsync(driver);
            await _driverRepository.SaveChangesAsync();

            var driverDto = _mapper.Map<DriverDto>(driver);
            return CreatedAtAction(nameof(GetDriverById),
                new { id = driver.Id, version = "1.0" },
                driverDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDriver(Guid id, [FromBody] UpdateDriverDto updateDto)
        {
            var driver = await _driverRepository.GetByIdAsync(id);
            if (driver == null || driver.IsDeleted.GetValueOrDefault())
                return NotFound();

            // Validate related entities if they're being updated
            if (updateDto.LicenseTypeId.HasValue &&
                !await _licenseTypeRepository.ExistsAsync(lt => lt.Id == updateDto.LicenseTypeId.Value))
                return BadRequest("Invalid license type ID");

            if (updateDto.VehicleTypeId.HasValue &&
                !await _vehicleTypeRepository.ExistsAsync(vt => vt.Id == updateDto.VehicleTypeId.Value))
                return BadRequest("Invalid vehicle type ID");

            if (updateDto.HubId.HasValue &&
                !await _hubRepository.ExistsAsync(h => h.Id == updateDto.HubId.Value))
                return BadRequest("Invalid hub ID");

            _mapper.Map(updateDto, driver);
            driver.ModifiedBy = _currentUserService.UserId;
            driver.ModifiedAt = DateTime.UtcNow;

            await _driverRepository.UpdateAsync(driver);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(Guid id)
        {
            var driver = await _driverRepository.GetByIdAsync(id);
            if (driver == null || driver.IsDeleted.GetValueOrDefault())
                return NotFound();

            driver.IsDeleted = true;
            driver.DeletedBy = _currentUserService.UserId;
            driver.DeletedAt = DateTime.UtcNow;

            await _driverRepository.UpdateAsync(driver);
            return NoContent();
        }

        [HttpPost("{id}/increment-trips")]
        public async Task<IActionResult> IncrementTrips(Guid id)
        {
            var driver = await _driverRepository.GetByIdAsync(id);
            if (driver == null || driver.IsDeleted.GetValueOrDefault())
             return NotFound();

            driver.Trips++;
            driver.ModifiedAt = DateTime.UtcNow;
            await _driverRepository.UpdateAsync(driver);

            return NoContent();
        }

        [HttpPost("{id}/update-rating")]
        public async Task<IActionResult> UpdateRating(Guid id, [FromBody] UpdateRatingDto ratingDto)
        {
            var driver = await _driverRepository.GetByIdAsync(id);
            if (driver == null || driver.IsDeleted.GetValueOrDefault())
                return NotFound();

            // Simple moving average calculation
            driver.Rating = (driver.Rating * driver.Trips + ratingDto.NewRating) / (driver.Trips + 1);
            driver.ModifiedAt = DateTime.UtcNow;
            await _driverRepository.UpdateAsync(driver);

            return NoContent();
        }
    }
}