using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Linq.Expressions;
using Asp.Versioning;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/vehicles")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly IRepository<Vehicle> _vehicleRepository;
        private readonly IRepository<VehicleMake> _makeRepository;
        private readonly IRepository<VehicleModel> _modelRepository;
        private readonly IRepository<Hub> _hubRepository;
        private readonly IRepository<Driver> _driverRepository;
        private readonly IMapper _mapper;

        public VehiclesController(
            IRepository<Vehicle> vehicleRepository,
            IRepository<VehicleMake> makeRepository,
            IRepository<VehicleModel> modelRepository,
            IRepository<Hub> hubRepository,
            IRepository<Driver> driverRepository,
            IMapper mapper)
        {
            _vehicleRepository = vehicleRepository;
            _makeRepository = makeRepository;
            _modelRepository = modelRepository;
            _hubRepository = hubRepository;
            _driverRepository = driverRepository;
            _mapper = mapper;
        }

        [HttpGet("by-hub/{hubId}")]
        [Authorize(Roles = "Admin,FleetManager")]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> GetByHub(Guid hubId)
        {
            if (!await _hubRepository.ExistsAsync(h => h.Id == hubId))
                return BadRequest("Hub not found");

            var vehicles = await _vehicleRepository.GetAsync(v => v.HubId == hubId);
            return Ok(_mapper.Map<IEnumerable<VehicleDto>>(vehicles));
        }

        [HttpPost("bulk-assign-driver")]
        [Authorize(Roles = "Admin,FleetManager")]
        public async Task<IActionResult> BulkAssignDriver([FromBody] BulkAssignDriverDto dto)
        {
            // Validate driver exists
            if (!await _driverRepository.ExistsAsync(d => d.Id == dto.DriverId))
                return BadRequest("Driver not found");

            var vehicles = await _vehicleRepository.GetAsync(v => dto.VehicleIds.Contains(v.Id));
            foreach (var vehicle in vehicles)
            {
                vehicle.DriverId = dto.DriverId;
                await _vehicleRepository.UpdateAsync(vehicle);
            }

            return NoContent();
        }

        [HttpPut("{id}/maintenance-status")]
        [Authorize(Roles = "Admin,FleetManager,Workshop")]
        public async Task<IActionResult> UpdateMaintenanceStatus(
            Guid id,
            [FromBody] UpdateMaintenanceStatusDto dto)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(id);
            if (vehicle == null)
                return NotFound();

            vehicle.LastMaintenanceDate = dto.LastMaintenanceDate;
            vehicle.NextMaintenanceDate = dto.NextMaintenanceDate;
            vehicle.Status = dto.Status;

            await _vehicleRepository.UpdateAsync(vehicle);
            return NoContent();
        }
    }
}