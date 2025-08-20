using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;
using AutoMapper;
using OptiRoute360.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Asp.Versioning;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/countries")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly IRepository<Country> _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public CountriesController(
            IRepository<Country> repository,
            IMapper mapper,
            ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        // GET: api/v1/countries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetAll()
        {
            //var countries = await _repository.GetAllAsync();
            //return Ok(_mapper.Map<IEnumerable<CountryDto>>(countries));
            var countries = await _repository.GetAsync(
            filter: c => c.IsDeleted == null || c.IsDeleted == false );

            return Ok(_mapper.Map<IEnumerable<CountryDto>>(countries));

        }

        // GET: api/v1/countries/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CountryDto>> GetById(Guid id)
        {
            var country = await _repository.GetByIdAsync(id);
            if (country == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<CountryDto>(country));
        }

        // POST: api/v1/countries
        [HttpPost]
        public async Task<ActionResult<CountryDto>> Create(CreateCountryDto createDto)
        {
            var country = _mapper.Map<Country>(createDto);
            country.CreatedBy = _currentUserService.UserId; // Optional: Track who created it
            country.CreatedAt = DateTime.UtcNow;

            await _repository.AddAsync(country);
            await _repository.SaveChangesAsync();

            var countryDto = _mapper.Map<CountryDto>(country);
            return CreatedAtAction(nameof(GetById), new { id = country.Id }, countryDto);
        }

        // PUT: api/v1/countries/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<CountryDto>> Update(Guid id, UpdateCountryDto updateDto)
        {
            var country = await _repository.GetByIdAsync(id);
            if (country == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, country);
            country.ModifiedBy = _currentUserService.UserId; // Optional: Track who updated it
            country.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(country);
            await _repository.SaveChangesAsync();

            return Ok(_mapper.Map<CountryDto>(country));
        }

        // DELETE: api/v1/countries/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(Guid id)
        {
            var country = await _repository.GetByIdAsync(id);
            if (country == null) return NotFound();

            country.IsDeleted = true;
            country.DeletedBy = _currentUserService.UserId;
            country.DeletedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(country);
            return NoContent();
        }

        // GET: api/v1/countries/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetActiveCountries()
        {
            var countries = await _repository.GetAsync(c => c.Status == "Active");
            return Ok(_mapper.Map<IEnumerable<CountryDto>>(countries));
        }
    }
}