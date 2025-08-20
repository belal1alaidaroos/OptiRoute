using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/shipments")]

    public class ShipmentsController : ControllerBase
    {
        private readonly IRepository<Shipment> _repository;
        private readonly IMapper _mapper;
        private readonly IRepository<Customer> _customerRepository;
        private readonly IRepository<Period> _periodRepository;
        private readonly IRepository<Driver> _driverRepository;
        private readonly IRepository<Trip> _tripRepository;
        private readonly IRepository<Hub> _hubRepository;

        public ShipmentsController(
            IRepository<Shipment> repository,
            IMapper mapper,
            IRepository<Customer> customerRepository,
            IRepository<Period> periodRepository,
            IRepository<Driver> driverRepository,
            IRepository<Trip> tripRepository,
            IRepository<Hub> hubRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _customerRepository = customerRepository;
            _periodRepository = periodRepository;
            _driverRepository = driverRepository;
            _tripRepository = tripRepository;
            _hubRepository = hubRepository;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Dispatcher,CustomerService")]
        public async Task<ActionResult<IEnumerable<ShipmentDto>>> GetAll()
        {
            var shipments = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<ShipmentDto>>(shipments));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Dispatcher,CustomerService,Driver")]
        public async Task<ActionResult<ShipmentDto>> GetById(Guid id)
        {
            var shipment = await _repository.GetByIdAsync(id);
            if (shipment == null) return NotFound();
            return Ok(_mapper.Map<ShipmentDto>(shipment));
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Dispatcher,CustomerService")]
        //public async Task<ActionResult<ShipmentDto>> Create([FromBody] CreateShipmentDto dto)
        //{
        //    // Validate relationships
        //    if (!await _customerRepository.ExistsAsync(dto.CustomerId))
        //        return BadRequest("Customer not found");

        //    if (!await _periodRepository.ExistsAsync(dto.PeriodId ))
        //        return BadRequest("Period not found");

        //    if (dto.DriverId.HasValue && !await _driverRepository.ExistsAsync(dto.DriverId.Value))
        //        return BadRequest("Driver not found");

        //    if (dto.TripId.HasValue && !await _tripRepository.ExistsAsync(dto.TripId.Value))
        //        return BadRequest("Trip not found");

        //    if (dto.HubId.HasValue && !await _hubRepository.ExistsAsync(dto.HubId.Value))
        //        return BadRequest("Hub not found");

        //    var shipment = _mapper.Map<Shipment>(dto);
        //    shipment.ShipmentNumber = GenerateShipmentNumber();
        //    await _repository.AddAsync(shipment);

        //    return CreatedAtAction(nameof(GetById), new { id = shipment.Id },
        //        _mapper.Map<ShipmentDto>(shipment));
        //}

        //[HttpPut("{id}/status")]
        //[Authorize(Roles = "Admin,Dispatcher,Driver")]
        //public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateShipmentStatusDto dto)
        //{
        //    var shipment = await _repository.GetByIdAsync(id);
        //    if (shipment == null) return NotFound();

        //    shipment.Status = dto.Status;
        //    if (dto.Status == "Delivered") shipment.EstimatedArrival = DateTime.UtcNow;

        //    await _repository.UpdateAsync(shipment);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        //public async Task<IActionResult> Delete(Guid id)
        //{
        //    var shipment = await _repository.GetByIdAsync(id);
        //    if (shipment == null) return NotFound();

        //    if (shipment.Status != "Pending")
        //        return BadRequest("Only pending shipments can be deleted");

        //    await _repository.DeleteAsync(shipment);
        //    return NoContent();
        //}

        private string GenerateShipmentNumber()
        {
            return $"SH-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";
        }
    }
}