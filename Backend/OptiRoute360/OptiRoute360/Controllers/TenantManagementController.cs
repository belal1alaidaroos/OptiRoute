using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Entities;
using OptiRoute360.Data.Repositories;
using AutoMapper;
using Asp.Versioning;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/tenants")]
    public class TenantManagementController : ControllerBase
    {
        private readonly ITenantRepository<TenantManagement> _repository;
        private readonly IMapper _mapper;

        public TenantManagementController(
            ITenantRepository<TenantManagement> repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost("validate-subdomain")]
        public async Task<ActionResult<bool>> ValidateSubdomain([FromBody] ValidateSubdomainDto dto)
        {
            var exists = await _repository.ExistsAsync(t =>
                t.CompanyName.ToLower() == dto.Subdomain.ToLower());
            return Ok(!exists);
        }
    }
}
