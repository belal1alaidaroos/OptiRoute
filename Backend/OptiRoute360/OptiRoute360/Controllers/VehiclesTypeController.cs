using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/vehicles/types")]

    public class VehiclesTypeController : ControllerBase
    {
        private readonly IRepository<VehicleType> _repository;
        private readonly IMapper _mapper;

        public VehiclesTypeController(IRepository<VehicleType> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleTypeDto>>> GetAll()
        {
            var types = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<VehicleTypeDto>>(types));
        }

        [HttpPost("update-icons")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateIcons([FromBody] Dictionary<Guid, string> iconUpdates)
        {
            foreach (var update in iconUpdates)
            {
                var type = await _repository.GetByIdAsync(update.Key);
                if (type != null)
                {
                    type.Icon = update.Value;
                    await _repository.UpdateAsync(type);
                }
            }
            return NoContent();
        }
    }
}