using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using OptiRoute360.Services;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/integrations")]

    public class IntegrationsController : ControllerBase
    {
        private readonly IRepository<Integration> _repository;
        private readonly IMapper _mapper;
        private readonly IEncryptionService _encryptionService;

        public IntegrationsController(
            IRepository<Integration> repository,
            IMapper mapper,
            IEncryptionService encryptionService)
        {
            _repository = repository;
            _mapper = mapper;
            _encryptionService = encryptionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IntegrationDto>>> GetAll([FromQuery] string status = null)
        {
            var integrations = await _repository.GetAsync(
                filter: i => status == null || i.Status == status);

            var dtos = _mapper.Map<IEnumerable<IntegrationDto>>(integrations);
            foreach (var dto in dtos)
            {
                dto.ApiKey = "********"; // Mask sensitive data
            }

            return Ok(dtos);
        }

        [HttpPost]
        public async Task<ActionResult<IntegrationDto>> Create([FromBody] CreateIntegrationDto dto)
        {
            var integration = _mapper.Map<Integration>(dto);
            integration.ApiKey = _encryptionService.Encrypt(dto.ApiKey);
            integration.LastSync = DateTime.UtcNow;

            await _repository.AddAsync(integration);
            return CreatedAtAction(nameof(GetById), new { id = integration.Id }, _mapper.Map<IntegrationDto>(integration));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IntegrationDto>> GetById(Guid id)
        {
            var integration = await _repository.GetByIdAsync(id);
            if (integration == null)
                return NotFound();

            return Ok(_mapper.Map<IntegrationDto>(integration));
        }

    }
}