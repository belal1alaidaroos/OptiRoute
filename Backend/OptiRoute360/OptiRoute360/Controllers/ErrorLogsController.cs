using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/error-logs")]

    public class ErrorLogsController : ControllerBase
    {
        private readonly IRepository<ErrorLog> _repository;
        private readonly IMapper _mapper;

        public ErrorLogsController(IRepository<ErrorLog> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ErrorLogDto>>> GetAll(
            [FromQuery] int severity = 1,
            [FromQuery] int status = 1)
        {
            var logs = await _repository.GetAsync(
                filter: log =>
                    (severity == null || log.Severity == severity) &&
                    (status == null || log.Status == status),
                orderBy: q => q.OrderByDescending(l => l.Timestamp));
            return Ok(_mapper.Map<IEnumerable<ErrorLogDto>>(logs));
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateErrorLogStatusDto dto)
        {
            var log = await _repository.GetByIdAsync(id);
            if (log == null) return NotFound();

            log.Status = dto.Status;
            log.Resolution = dto.Resolution;
            await _repository.UpdateAsync(log);
            return NoContent();
        }
    }
}