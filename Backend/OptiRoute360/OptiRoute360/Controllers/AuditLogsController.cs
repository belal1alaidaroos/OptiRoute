using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;
using OptiRoute360.Data.Interfaces;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/audit-logs")]

    public class AuditLogsController : ControllerBase
    {
        private readonly IRepository<AuditLog> _repository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public AuditLogsController(
            IRepository<AuditLog> repository,
            IUserRepository userRepository,
            IMapper mapper)
        {
            _repository = repository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuditLogDto>>> GetAll(
            [FromQuery] DateTime? fromDate = null,
            [FromQuery] DateTime? toDate = null,
            [FromQuery] int severity = 1)
        {
            var logs = await _repository.GetAsync(
                filter: log =>
                    (!fromDate.HasValue || log.Timestamp >= fromDate.Value) &&
                    (!toDate.HasValue || log.Timestamp <= toDate.Value) &&
                    (severity == null || log.Severity == severity),
                includes: new[] { nameof(AuditLog.User) },
                orderBy: q => q.OrderByDescending(l => l.Timestamp));
            return Ok(_mapper.Map<IEnumerable<AuditLogDto>>(logs));
        }
    }
}