using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;
using OptiRoute360.Services;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/geo-zones")]

    public class GeoZonesController : ControllerBase
    {
        private readonly IRepository<GeoZone> _repository;
        private readonly IRepository<City> _cityRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GeoZonesController(
            IRepository<GeoZone> repository,
            IRepository<City> cityRepository,
            IMapper mapper,
            ICurrentUserService currentUserService)
        {
            _repository = repository;
            _cityRepository = cityRepository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<GeoZoneDto>>> GetAll(
     [FromQuery] Guid? cityId = null,
     [FromQuery] string status = null)
        {
            var zones = await _repository.GetAsync(
                filter: z =>
                    (z.IsDeleted == null || z.IsDeleted == false) &&  // Soft Delete Filter
                    (!cityId.HasValue || z.CityId == cityId.Value) &&
                    (status == null || z.Status == status),
                includes: new[] { nameof(GeoZone.City) });

            return Ok(_mapper.Map<IEnumerable<GeoZoneDto>>(zones));
        }


        [HttpPost]
        public async Task<ActionResult<GeoZoneDto>> Create([FromBody] CreateGeoZoneDto dto)
        {
            if (!await _cityRepository.ExistsAsync(c => c.Id == dto.CityId))
                return BadRequest("Invalid City ID");

            var zone = _mapper.Map<GeoZone>(dto);
            await _repository.AddAsync(zone);
            // return CreatedAtAction(nameof(GetById), new { id = zone.Id }, _mapper.Map<GeoZoneDto>(zone));
            return CreatedAtAction("GetById", new { id = zone.Id }, _mapper.Map<GeoZoneDto>(zone));

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<GeoZoneDto>> GetById(Guid id)
        {
            var zone = await _repository.GetByIdAsync(id, includes: new[] { nameof(GeoZone.City) });
            if (zone == null || zone.IsDeleted == true)
                return NotFound();

            return Ok(_mapper.Map<GeoZoneDto>(zone));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var zone = await _repository.GetByIdAsync(id);
            if (zone == null)
                return NotFound();

            zone.IsDeleted = true;
            zone.DeletedBy = _currentUserService.UserId;
            zone.DeletedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(zone);
            return NoContent();
        }


    }
}