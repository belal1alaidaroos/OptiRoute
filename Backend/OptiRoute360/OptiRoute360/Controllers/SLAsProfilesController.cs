using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/sla-profiles")]

    public class SLAsProfilesController : ControllerBase
    {
        private readonly IRepository<SLAsProfile> _repository;
        private readonly IMapper _mapper;

        public SLAsProfilesController(IRepository<SLAsProfile> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,CustomerService")]
        public async Task<ActionResult<IEnumerable<SLAsProfileDto>>> GetAll()
        {
            var profiles = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<SLAsProfileDto>>(profiles));
        }

        //[HttpPost]
        //[Authorize(Roles = "Admin")]
        //public async Task<ActionResult<SLAsProfileDto>> Create([FromBody] CreateSLAsProfileDto dto)
        //{
        //    var existing = await _repository.FindAsync(p => p.SLAName == dto.SLAName);
        //    if (existing.Any())
        //        return BadRequest("SLA profile with this name already exists");

        //    var profile = _mapper.Map<SLAsProfile>(dto);
        //    await _repository.AddAsync(profile);

        //    return CreatedAtAction(nameof(GetById), new { id = profile.Id },
        //        _mapper.Map<SLAsProfileDto>(profile));
        //}
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<SLAsProfileDto>> Create([FromBody] CreateSLAsProfileDto dto)
        {
            // Check if SLAName already exists
            var existing = await _repository.GetAsync(p => p.SLAName == dto.SLAName);
            if (existing.Any())
            {
                return BadRequest("SLAName already exists");
            }

            // Map and create new profile
            var profile = _mapper.Map<SLAsProfile>(dto);
            await _repository.AddAsync(profile);
            await _repository.SaveChangesAsync();

            // Return created response
            return CreatedAtAction(
                nameof(GetById),
                new { id = profile.Id },
                _mapper.Map<SLAsProfileDto>(profile));



        }
        [HttpGet("{id}")]
        public async Task<ActionResult<SLAsProfileDto>> GetById(Guid id)
        {
            var profile = await _repository.GetByIdAsync(id);
            if (profile == null)
            {
                return NotFound(); // If file not exist 
            }
            return Ok(_mapper.Map<SLAsProfileDto>(profile)); // إرجاع البيانات إذا وجدت
        }

        [HttpPut("{id}/toggle-active")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ToggleActive(Guid id)
        {
            var profile = await _repository.GetByIdAsync(id);
            if (profile == null) return NotFound();

            profile.Status = profile.Status == "Active" ? "Inactive" : "Active";
            await _repository.UpdateAsync(profile);
            return NoContent();
        }


    }
}