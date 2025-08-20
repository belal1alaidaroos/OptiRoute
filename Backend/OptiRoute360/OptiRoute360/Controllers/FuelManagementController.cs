using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;
using OptiRoute360.Services;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/fuel-management")]

    public class FuelManagementController : ControllerBase
    {
        private readonly IRepository<FuelManagement> _repository;
        private readonly IRepository<Vehicle> _vehicleRepository;
        private readonly IRepository<Driver> _driverRepository;
        private readonly IRepository<Workshop> _workshopRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;


        public FuelManagementController(
         IRepository<FuelManagement> repository,
         IRepository<Vehicle> vehicleRepository,
         IRepository<Driver> driverRepository,
         IRepository<Workshop> workshopRepository,
         IMapper mapper,
         ICurrentUserService currentUserService)  // ➜ Inject هنا
            {
                _repository = repository;
                _vehicleRepository = vehicleRepository;
                _driverRepository = driverRepository;
                _workshopRepository = workshopRepository;
                _mapper = mapper;
                _currentUserService = currentUserService;  // ➜ Assign هنا
            }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<FuelManagementDto>>> GetAll(
            [FromQuery] Guid? vehicleId = null,
            [FromQuery] DateTime? fromDate = null)
        {
            var records = await _repository.GetAsync(
                filter: f =>
                    (f.IsDeleted == null || f.IsDeleted == false) &&  // Soft Delete Filter
                    (!vehicleId.HasValue || f.VehicleId == vehicleId.Value) &&
                    (!fromDate.HasValue || f.Date >= fromDate.Value),
                includes: new[] { nameof(FuelManagement.Vehicle), nameof(FuelManagement.Driver), nameof(FuelManagement.FuelStation) });

            return Ok(_mapper.Map<IEnumerable<FuelManagementDto>>(records));
        }

        [HttpPost]
        public async Task<ActionResult<FuelManagementDto>> Create([FromBody] CreateFuelManagementDto dto)
        {
            if (!await _vehicleRepository.ExistsAsync(v => v.Id == dto.VehicleId))
                return BadRequest("Invalid vehicle ID");

            if (!await _driverRepository.ExistsAsync(d => d.Id == dto.DriverId))
                return BadRequest("Invalid driver ID");

            if (!await _workshopRepository.ExistsAsync(w => w.Id == dto.FuelStationId))
                return BadRequest("Invalid fuel station ID");

            var record = _mapper.Map<FuelManagement>(dto);
            record.TotalCost = record.Quantity * record.PricePerLiter;
            await _repository.AddAsync(record);

            return CreatedAtAction(nameof(GetById), new { id = record.Id }, _mapper.Map<FuelManagementDto>(record));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<FuelManagementDto>> GetById(Guid id)
        {
            var record = await _repository.GetByIdAsync(id);
            if (record == null || record.IsDeleted == true)  // Soft Delete Filter
                return NotFound();

            return Ok(_mapper.Map<FuelManagementDto>(record));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var record = await _repository.GetByIdAsync(id);
            if (record == null)
                return NotFound();

            record.IsDeleted = true;
            record.DeletedBy = _currentUserService.UserId;
            record.DeletedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(record);
            return NoContent();
        }



    }
}