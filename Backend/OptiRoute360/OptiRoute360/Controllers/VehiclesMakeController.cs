using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/vehicles/makes")]

    public class VehiclesMakeController : ControllerBase
    {
        private readonly IRepository<VehicleMake> _repository;
        private readonly IMapper _mapper;

        public VehiclesMakeController(IRepository<VehicleMake> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleMakeDto>>> GetAll([FromQuery] bool? popular = null)
        {
            var makes = await _repository.GetAsync(
                filter: m => popular == null || m.Popular == popular.Value);
            return Ok(_mapper.Map<IEnumerable<VehicleMakeDto>>(makes));
        }

        [HttpPost("toggle-popular/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> TogglePopular(Guid id)
        {
            var make = await _repository.GetByIdAsync(id);
            if (make == null) return NotFound();

            make.Popular = !make.Popular;
            await _repository.UpdateAsync(make);
            return NoContent();
        }
    }
}