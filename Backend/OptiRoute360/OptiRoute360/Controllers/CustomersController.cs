using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/customers")]

    public class CustomersController : ControllerBase
    {
        private readonly IRepository<Customer> _customerRepository;
        private readonly IRepository<Country> _countryRepository;
        private readonly IRepository<Region> _regionRepository;
        private readonly IMapper _mapper;

        public CustomersController(
            IRepository<Customer> customerRepository,
            IRepository<Country> countryRepository,
            IRepository<Region> regionRepository,
            IMapper mapper)
        {
            _customerRepository = customerRepository;
            _countryRepository = countryRepository;
            _regionRepository = regionRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetAllCustomers(
            [FromQuery] string status = null,
            [FromQuery] Guid? countryId = null)
        {
            var customers = await _customerRepository.GetAsync(
                filter: c =>
                    (status == null || c.Status == status) &&
                    (!countryId.HasValue || c.CountryId == countryId.Value),
                includes: new[] { nameof(Customer.Country), nameof(Customer.Region), nameof(Customer.City) });
            return Ok(_mapper.Map<IEnumerable<CustomerDto>>(customers));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomer(Guid id)
        {
            var customer = await _customerRepository.GetByIdAsync(id,
                includes: new[] { nameof(Customer.Country), nameof(Customer.Region), nameof(Customer.City) });
            if (customer == null) return NotFound();
            return Ok(_mapper.Map<CustomerDto>(customer));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerDto>> CreateCustomer([FromBody] CreateCustomerDto dto)
        {
            if (!await _countryRepository.ExistsAsync(c => c.Id == dto.CountryId))
                return BadRequest("Invalid Country ID");

            if (!await _regionRepository.ExistsAsync(r => r.Id == dto.RegionId))
                return BadRequest("Invalid Region ID");

            var customer = _mapper.Map<Customer>(dto);
            customer.JoinDate = DateTime.UtcNow;
            customer.TotalOrders = 0;
            customer.TotalValue = 0;

            await _customerRepository.AddAsync(customer);
            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, _mapper.Map<CustomerDto>(customer));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(Guid id, [FromBody] UpdateCustomerDto dto)
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null) return NotFound();

            if (dto.CountryId.HasValue && !await _countryRepository.ExistsAsync(c => c.Id == dto.CountryId.Value))
                return BadRequest("Invalid Country ID");

            if (dto.RegionId.HasValue && !await _regionRepository.ExistsAsync(r => r.Id == dto.RegionId.Value))
                return BadRequest("Invalid Region ID");

            _mapper.Map(dto, customer);
            await _customerRepository.UpdateAsync(customer);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            await _customerRepository.DeleteAsync(id);
            return NoContent();
        }

        [HttpPost("{id}/increment-orders")]
        public async Task<IActionResult> IncrementOrders(Guid id, [FromBody] decimal orderValue)
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null) return NotFound();

            customer.TotalOrders++;
            customer.TotalValue += orderValue;

            await _customerRepository.UpdateAsync(customer);
            return NoContent();
        }
    }
}