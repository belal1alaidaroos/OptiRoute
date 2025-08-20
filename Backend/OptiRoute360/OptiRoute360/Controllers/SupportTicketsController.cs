using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;
using OptiRoute360.Data.Interfaces;  // For IMapper

namespace OptiRoute360.Controllers
{

    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/support-tickets")]

    public class SupportTicketsController : ControllerBase
    {
        private readonly IRepository<SupportTicket> _repository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public SupportTicketsController(
            IRepository<SupportTicket> repository,
            IMapper mapper,
            IUserRepository userRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpPost("assign/{ticketId}")]
        [Authorize(Roles = "Admin,SupportManager")]
        public async Task<IActionResult> AssignTicket(Guid ticketId, [FromBody] AssignTicketDto dto)
        {
            var ticket = await _repository.GetByIdAsync(ticketId);
            if (ticket == null) return NotFound();

           // if (!await _userRepository.ExistsAsync(dto.AssigneeId))
                if (!await _userRepository.ExistsAsync(u => u.Id == dto.AssigneeId))

                    return BadRequest("Assignee not found");

            ticket.AssignedToId = dto.AssigneeId;
            ticket.Status = 1;// "Assigned";
            await _repository.UpdateAsync(ticket);

            return NoContent();
        }
    }
}