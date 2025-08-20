using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/units-measure")]

    public class UnitsMeasureController : ControllerBase
    {
        private readonly IRepository<UnitsMeasure> _repository;
        private readonly IMapper _mapper;

        public UnitsMeasureController(
            IRepository<UnitsMeasure> repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("by-category/{category}")]
        public async Task<ActionResult<IEnumerable<UnitsMeasureDto>>> GetByCategory(string category)
        {
            var units = await _repository.FindAsync(u => u.Category == category);
            return Ok(_mapper.Map<IEnumerable<UnitsMeasureDto>>(units));
        }
    }
}