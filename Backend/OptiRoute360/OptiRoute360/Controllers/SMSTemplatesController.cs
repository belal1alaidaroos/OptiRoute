using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/sms-templates")]

    public class SMSTemplatesController : ControllerBase
    {
        private readonly IRepository<SMSTemplate> _repository;
        private readonly IMapper _mapper;

        public SMSTemplatesController(IRepository<SMSTemplate> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Communications")]
        public async Task<ActionResult<IEnumerable<SMSTemplateDto>>> GetAll()
        {
            var templates = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<SMSTemplateDto>>(templates));
        }

        [HttpPost("preview")]
        public ActionResult<string> PreviewTemplate([FromBody] PreviewSMSTemplateDto dto)
        {
            // Logic to replace variables in template
            return Ok($"Preview: {dto.Content}");
        }
    }
}