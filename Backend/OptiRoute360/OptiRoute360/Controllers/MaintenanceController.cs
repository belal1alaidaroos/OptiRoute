using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/maintenance")]

    public class MaintenanceController : ControllerBase
    {
        private readonly IRepository<Maintenance> _repository;
        private readonly IRepository<Vehicle> _vehicleRepository;
        private readonly IRepository<MaintenanceType> _typeRepository;
        private readonly IRepository<Workshop> _workshopRepository;
        private readonly IMapper _mapper;

        public MaintenanceController(
            IRepository<Maintenance> repository,
            IRepository<Vehicle> vehicleRepository,
            IRepository<MaintenanceType> typeRepository,
            IRepository<Workshop> workshopRepository,
            IMapper mapper)
        {
            _repository = repository;
            _vehicleRepository = vehicleRepository;
            _typeRepository = typeRepository;
            _workshopRepository = workshopRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceDto>>> GetAll(
            [FromQuery] Guid? vehicleId = null,
            [FromQuery] string status = null)
        {
            var records = await _repository.GetAsync(
                filter: m =>
                    (!vehicleId.HasValue || m.VehicleId == vehicleId.Value) &&
                    (status == null || m.Status == status),
                includes: new[] { nameof(Maintenance.Vehicle), nameof(Maintenance.MaintenanceType), nameof(Maintenance.Workshop) });
            return Ok(_mapper.Map<IEnumerable<MaintenanceDto>>(records));
        }

        [HttpPost("{id}/complete")]
        public async Task<IActionResult> CompleteMaintenance(Guid id, [FromBody] CompleteMaintenanceDto dto)
        {
            var maintenance = await _repository.GetByIdAsync(id);
            if (maintenance == null) return NotFound();

            maintenance.Status = "Completed";
            maintenance.ActualCost = dto.ActualCost;
            maintenance.CompletionDate = DateTime.UtcNow;

            await _repository.UpdateAsync(maintenance);

            // Update vehicle's last maintenance date
            var vehicle = await _vehicleRepository.GetByIdAsync(maintenance.VehicleId);
            if (vehicle != null)
            {
                vehicle.LastMaintenanceDate = DateTime.UtcNow;
                await _vehicleRepository.UpdateAsync(vehicle);
            }

            return NoContent();
        }
    }
}