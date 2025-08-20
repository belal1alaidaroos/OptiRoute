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

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<ServicesRequestDto>>> GetAll(
        //    [FromQuery] string status = null,
        //    [FromQuery] Guid? vehicleId = null)
        //{
        //    var requests = await _repository.GetAsync(
        //        filter: sr =>
        //            (status == null || sr.Status == status) &&
        //            (!vehicleId.HasValue || sr.VehicleId == vehicleId.Value),
        //        includes: new[] { nameof(ServicesRequest.Vehicle), nameof(ServicesRequest.Workshop) });
        //    return Ok(_mapper.Map<IEnumerable<ServicesRequestDto>>(requests));
        //}

        //[HttpPost("approve/{id}")]
        //public async Task<IActionResult> ApproveRequest(Guid id)
        //{
        //    var request = await _repository.GetByIdAsync(id);
        //    if (request == null) return NotFound();

        //    request.Status = "Approved";
        //    await _repository.UpdateAsync(request);

        //    // Create maintenance record if needed
        //    return NoContent();
        //}
    }
}