using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;
using OptiRoute360.Services;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/fuel-types")]

    public class FuelsTypeController : ControllerBase
    {
        private readonly IRepository<FuelType> _repository;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public FuelsTypeController(IRepository<FuelType> repository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<FuelTypeDto>>> GetAll([FromQuery] string status = null)
        {
            var types = await _repository.GetAsync(
                filter: t =>
                    (t.IsDeleted == null || t.IsDeleted == false) &&  // Soft Delete Filter
                    (status == null || t.Status == status));

            return Ok(_mapper.Map<IEnumerable<FuelTypeDto>>(types));
        }


        [HttpPost]
        public async Task<ActionResult<FuelTypeDto>> Create([FromBody] CreateFuelTypeDto dto)
        {
            var type = _mapper.Map<FuelType>(dto);
            await _repository.AddAsync(type);
            return CreatedAtAction(nameof(GetById), new { id = type.Id }, _mapper.Map<FuelTypeDto>(type));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FuelTypeDto>> GetById(Guid id)
        {
            var type = await _repository.GetByIdAsync(id);
            if (type == null || type.IsDeleted == true)  // Soft Delete Filter
                return NotFound();

            return Ok(_mapper.Map<FuelTypeDto>(type));
        }
 
        


    }
}