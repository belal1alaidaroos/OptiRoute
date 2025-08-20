using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;
using OptiRoute360.Services;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/cities")]

    public class CitiesController : ControllerBase
    {
        private readonly IRepository<City> _cityRepository;
        private readonly IRepository<Region> _regionRepository;
        private readonly IRepository<Country> _countryRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;


        public CitiesController(
            IRepository<City> cityRepository,
            IRepository<Region> regionRepository,
            IRepository<Country> countryRepository,
            IMapper mapper,
                            ICurrentUserService currentUserService)  // ➜ Inject it here
        {
            _cityRepository = cityRepository;
            _regionRepository = regionRepository;
            _countryRepository = countryRepository;
            _mapper = mapper;
            _currentUserService = currentUserService;  // ➜ Assign it here
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CityDto>>> GetAllCities(
       [FromQuery] Guid? regionId = null,
       [FromQuery] Guid? countryId = null,
       [FromQuery] string status = null)
        {
            var cities = await _cityRepository.GetAsync(
                filter: c =>
                    (c.IsDeleted == null || c.IsDeleted == false) &&  // ➜ Soft Delete Filter
                    (!regionId.HasValue || c.RegionId == regionId.Value) &&
                    (!countryId.HasValue || c.CountryId == countryId.Value) &&
                    (status == null || c.Status == status),
                includes: new[] { nameof(City.Region), nameof(City.Country) });

            return Ok(_mapper.Map<IEnumerable<CityDto>>(cities));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<CityDto>> GetCity(Guid id)
        {
            var city = await _cityRepository.GetByIdAsync(id,
                includes: new[] { nameof(City.Region), nameof(City.Country) });
            if (city == null) return NotFound();
            return Ok(_mapper.Map<CityDto>(city));
        }

        [HttpPost]
        public async Task<ActionResult<CityDto>> CreateCity([FromBody] CreateCityDto dto)
        {
            if (!await _regionRepository.ExistsAsync(r => r.Id == dto.RegionId))
                return BadRequest("Invalid Region ID");

            if (!await _countryRepository.ExistsAsync(c => c.Id == dto.CountryId))
                return BadRequest("Invalid Country ID");

            var city = _mapper.Map<City>(dto);
            await _cityRepository.AddAsync(city);
            return CreatedAtAction(nameof(GetCity), new { id = city.Id }, _mapper.Map<CityDto>(city));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCity(Guid id, [FromBody] UpdateCityDto dto)
        {
            var city = await _cityRepository.GetByIdAsync(id);
            if (city == null) return NotFound();

            if (dto.RegionId.HasValue && !await _regionRepository.ExistsAsync(r => r.Id == dto.RegionId.Value))
                return BadRequest("Invalid Region ID");

            if (dto.CountryId.HasValue && !await _countryRepository.ExistsAsync(c => c.Id == dto.CountryId.Value))
                return BadRequest("Invalid Country ID");

            _mapper.Map(dto, city);
            await _cityRepository.UpdateAsync(city);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(Guid id)
        {
            var city = await _cityRepository.GetByIdAsync(id);
            if (city == null) return NotFound();

            city.IsDeleted = true;
            city.DeletedBy = _currentUserService.UserId;  // ➜ Fill DeletedBy
            city.DeletedAt = DateTime.UtcNow;             // ➜ Fill DeletedAt

            await _cityRepository.UpdateAsync(city);
            return NoContent();
        }


    }
}