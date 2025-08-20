using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/vehicle-details")]

    public class VehicleDetailController : ControllerBase
    {
        private readonly IRepository<VehicleDetail> _repository;
        private readonly IRepository<Vehicle> _vehicleRepository;
        private readonly IMapper _mapper;

        public VehicleDetailController(
            IRepository<VehicleDetail> repository,
            IRepository<Vehicle> vehicleRepository,
            IMapper mapper)
        {
            _repository = repository;
            _vehicleRepository = vehicleRepository;
            _mapper = mapper;
        }

        [HttpGet("by-vehicle/{vehicleId}")]
        public async Task<ActionResult<VehicleDetailDto>> GetByVehicleId(Guid vehicleId)
        {
            var detail = await _repository.GetAsync(
                filter: vd => vd.VehicleId == vehicleId,
                includes: new[] { nameof(VehicleDetail.Vehicle) });

            return Ok(_mapper.Map<VehicleDetailDto>(detail.FirstOrDefault()));
        }

        [HttpPut("update-specifications/{vehicleId}")]
        public async Task<IActionResult> UpdateSpecifications(Guid vehicleId, [FromBody] UpdateVehicleSpecsDto dto)
        {
            var detail = (await _repository.GetAsync(vd => vd.VehicleId == vehicleId)).FirstOrDefault();
            if (detail == null)
            {
                if (!await _vehicleRepository.ExistsAsync(v => v.Id == vehicleId))
                    return BadRequest("Invalid Vehicle ID");

                detail = _mapper.Map<VehicleDetail>(dto);
                detail.VehicleId = vehicleId;
                await _repository.AddAsync(detail);
                return CreatedAtAction(nameof(GetByVehicleId), new { vehicleId }, null);
            }

            _mapper.Map(dto, detail);
            await _repository.UpdateAsync(detail);
            return NoContent();
        }
    }
}