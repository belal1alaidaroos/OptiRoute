using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/workshops")]

    public class WorkshopsController : ControllerBase
    {
        private readonly IRepository<Workshop> _repository;
        private readonly IRepository<City> _cityRepository;
        private readonly IMapper _mapper;

        public WorkshopsController(
            IRepository<Workshop> repository,
            IRepository<City> cityRepository,
            IMapper mapper)
        {
            _repository = repository;
            _cityRepository = cityRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkshopDto>>> GetAll(
            [FromQuery] Guid? cityId = null,
            [FromQuery] string type = null)
        {
            var workshops = await _repository.GetAsync(
                filter: w =>
                    (!cityId.HasValue || w.CityId == cityId.Value) &&
                    (type == null || w.Type == type),
                includes: new[] { nameof(Workshop.City) });
            return Ok(_mapper.Map<IEnumerable<WorkshopDto>>(workshops));
        }

        [HttpGet("nearby")]
        public async Task<ActionResult<IEnumerable<WorkshopDto>>> GetNearby(
       [FromQuery] decimal  latitude,
       [FromQuery] decimal longitude,
       [FromQuery] decimal radius = 10)
        {
            var allWorkshops = await _repository.GetAllAsync();

            // Convert radius to double for comparison
            double radiusKm = (double)radius;

            var nearby = allWorkshops.Where(w =>
                CalculateDistance(
                    (double)latitude,
                    (double)longitude,
                    (double)w.Latitude,
                    (double)w.Longitude) <= radiusKm)
                .ToList();

            return Ok(_mapper.Map<IEnumerable<WorkshopDto>>(nearby));
        }

        // Haversine formula (using double for calculations)
        private static double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
        {
            const double R = 6371; // Earth radius in km
            var dLat = ToRadians(lat2 - lat1);
            var dLon = ToRadians(lon2 - lon1);
            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Cos(ToRadians(lat1)) *
                    Math.Cos(ToRadians(lat2)) *
                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return R * c;
        }

        private static double ToRadians(double angle) => angle * (Math.PI / 180);

        [HttpPost]
        [Authorize(Roles = "Admin,FleetManager")]
        public async Task<ActionResult<WorkshopDto>> Create([FromBody] CreateWorkshopDto dto)
        {
            var entity = _mapper.Map<Workshop>(dto);
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { version = "1.0" }, _mapper.Map<WorkshopDto>(entity));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,FleetManager")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateWorkshopDto dto)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            _mapper.Map(dto, entity);
            await _repository.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,FleetManager")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            await _repository.DeleteAsync(entity);
            return NoContent();
        }
    }
}