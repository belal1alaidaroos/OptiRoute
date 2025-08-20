using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/preventive-maintenance")]

    public class PreventiveMaintenanceController : ControllerBase
    {
        private readonly IRepository<PreventiveMaintenance> _repository;
        private readonly IRepository<Vehicle> _vehicleRepository;
        private readonly IRepository<MaintenanceType> _typeRepository;
        private readonly IMapper _mapper;

        public PreventiveMaintenanceController(
            IRepository<PreventiveMaintenance> repository,
            IRepository<Vehicle> vehicleRepository,
            IRepository<MaintenanceType> typeRepository,
            IMapper mapper)
        {
            _repository = repository;
            _vehicleRepository = vehicleRepository;
            _typeRepository = typeRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PreventiveMaintenanceDto>>> GetAll(
            [FromQuery] Guid? vehicleId = null,
            [FromQuery] string status = null)
        {
            var schedules = await _repository.GetAsync(
                filter: pm =>
                    (!vehicleId.HasValue || pm.VehicleId == vehicleId.Value) &&
                    (status == null || pm.Status == status),
                includes: new[] { nameof(PreventiveMaintenance.Vehicle), nameof(PreventiveMaintenance.MaintenanceType) });
            return Ok(_mapper.Map<IEnumerable<PreventiveMaintenanceDto>>(schedules));
        }

        [HttpPost("check-due")]
        public async Task<ActionResult<IEnumerable<PreventiveMaintenanceDto>>> CheckDueMaintenance()
        {
            var dueSchedules = await _repository.GetAsync(
                filter: pm => pm.NextDue <= DateTime.UtcNow && pm.Status == "Active");

            foreach (var schedule in dueSchedules)
            {
                schedule.Status = "Overdue";
                await _repository.UpdateAsync(schedule);
            }

            return Ok(_mapper.Map<IEnumerable<PreventiveMaintenanceDto>>(dueSchedules));
        }
    }
}