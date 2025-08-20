using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;
using OptiRoute360.Data.Interfaces;
using OptiRoute360.Services;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/hubs")]

    public class HubsController : ControllerBase
    {
        private readonly IRepository<Hub> _repository;
        private readonly IRepository<City> _cityRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public HubsController(
            IRepository<Hub> repository,
            IRepository<City> cityRepository,
            IUserRepository userRepository,
            IMapper mapper,
            ICurrentUserService currentUserService)
        {
            _repository = repository;
            _cityRepository = cityRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<HubDto>>> GetAll(
            [FromQuery] Guid? cityId = null,
            [FromQuery] string status = null)
        {
            var hubs = await _repository.GetAsync(
                filter: h =>
                    (h.IsDeleted == null || h.IsDeleted == false) &&  // Soft Delete Filter
                    (!cityId.HasValue || h.CityId == cityId.Value) &&
                    (status == null || h.Status == status),
                includes: new[] { nameof(Hub.City), nameof(Hub.Manager), nameof(Hub.Supervisor) });

            return Ok(_mapper.Map<IEnumerable<HubDto>>(hubs));
        }


        [HttpPost("update-capacity/{id}")]
        [Authorize(Roles = "HubManager")]
        public async Task<IActionResult> UpdateCapacity(Guid id, [FromBody] UpdateHubCapacityDto dto)
        {
            var hub = await _repository.GetByIdAsync(id);
            if (hub == null) return NotFound();

            hub.VehiclesCapacity = dto.VehiclesCapacity;
            hub.DriversCapacity = dto.DriversCapacity;
            await _repository.UpdateAsync(hub);
            return NoContent();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<HubDto>> GetById(Guid id)
        {
            var hub = await _repository.GetByIdAsync(id,
                includes: new[] { nameof(Hub.City), nameof(Hub.Manager), nameof(Hub.Supervisor) });

            if (hub == null || hub.IsDeleted == true)
                return NotFound();

            return Ok(_mapper.Map<HubDto>(hub));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateHubDto dto)
        {
            var hub = await _repository.GetByIdAsync(id);
            if (hub == null || hub.IsDeleted == true)
                return NotFound();

            _mapper.Map(dto, hub);
            hub.ModifiedBy = _currentUserService.UserId;
            hub.ModifiedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(hub);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var hub = await _repository.GetByIdAsync(id);
            if (hub == null)
                return NotFound();

            hub.IsDeleted = true;
            hub.DeletedBy = _currentUserService.UserId;
            hub.DeletedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(hub);
            return NoContent();
        }

    }
}