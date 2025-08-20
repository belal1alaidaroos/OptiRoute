using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/regions")]

    public class RegionsController : ControllerBase
    {
        private readonly IRepository<Region> _repository;
        private readonly IRepository<Country> _countryRepository;
        private readonly IMapper _mapper;

        public RegionsController(
            IRepository<Region> repository,
            IRepository<Country> countryRepository,
            IMapper mapper)
        {
            _repository = repository;
            _countryRepository = countryRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegionDto>>> GetAll(
            [FromQuery] Guid? countryId = null,
            [FromQuery] string status = null)
        {
            var regions = await _repository.GetAsync(
                filter: r =>
                    (!countryId.HasValue || r.CountryId == countryId.Value) &&
                    (status == null || r.Status == status),
                includes: new[] { nameof(Region.Country) });
            return Ok(_mapper.Map<IEnumerable<RegionDto>>(regions));
        }

        [HttpPost]
        public async Task<ActionResult<RegionDto>> Create([FromBody] CreateRegionDto dto)
        {
            if (!await _countryRepository.ExistsAsync(c => c.Id == dto.CountryId))
                return BadRequest("Invalid Country ID");

            var entity = _mapper.Map<Region>(dto);
            await _repository.AddAsync(entity);
            return CreatedAtAction(nameof(GetAll), new { version = "1.0" }, _mapper.Map<RegionDto>(entity));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateRegionDto dto)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            if (dto.CountryId.HasValue && !await _countryRepository.ExistsAsync(c => c.Id == dto.CountryId.Value))
                return BadRequest("Invalid Country ID");
            _mapper.Map(dto, entity);
            await _repository.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();
            await _repository.DeleteAsync(entity);
            return NoContent();
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportRegions([FromBody] List<CreateRegionDto> dtos)
        {
            foreach (var dto in dtos)
            {
                if (!await _countryRepository.ExistsAsync(c => c.Id == dto.CountryId))
                    return BadRequest($"Invalid Country ID for region {dto.Name}");

                var region = _mapper.Map<Region>(dto);
                await _repository.AddAsync(region);
            }

            return Ok();
        }
    }
}