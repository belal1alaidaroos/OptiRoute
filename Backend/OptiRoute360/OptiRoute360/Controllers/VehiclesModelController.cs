using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/vehicles/models")]

    public class VehiclesModelController : ControllerBase
    {
        private readonly IRepository<VehicleModel> _repository;
        private readonly IRepository<VehicleMake> _makeRepository;
        private readonly IRepository<VehicleType> _typeRepository;
        private readonly IMapper _mapper;

        public VehiclesModelController(
            IRepository<VehicleModel> repository,
            IRepository<VehicleMake> makeRepository,
            IRepository<VehicleType> typeRepository,
            IMapper mapper)
        {
            _repository = repository;
            _makeRepository = makeRepository;
            _typeRepository = typeRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleModelDto>>> GetAll(
            [FromQuery] Guid? makeId = null,
            [FromQuery] Guid? typeId = null)
        {
            var models = await _repository.GetAsync(
                filter: m =>
                    (!makeId.HasValue || m.MakeId == makeId.Value) &&
                    (!typeId.HasValue || m.TypeId == typeId.Value),
                includes: new[] { nameof(VehicleModel.Make), nameof(VehicleModel.Type) });
            return Ok(_mapper.Map<IEnumerable<VehicleModelDto>>(models));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VehicleModelDto>> Create([FromBody] CreateVehicleModelDto dto)
        {
            if (!await _makeRepository.ExistsAsync(m => m.Id == dto.MakeId))
                return BadRequest("Invalid Make ID");

            if (!await _typeRepository.ExistsAsync(t => t.Id == dto.TypeId))
                return BadRequest("Invalid Type ID");

            var model = _mapper.Map<VehicleModel>(dto);
            await _repository.AddAsync(model);
            return CreatedAtAction(nameof(GetById), new { id = model.Id }, _mapper.Map<VehicleModelDto>(model));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleModelDto>> GetById(Guid id)
        {
            var model = await _repository.GetByIdAsync(id);
            if (model == null)
                return NotFound();

            return Ok(_mapper.Map<VehicleModelDto>(model));
        }

    }

}