using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Repositories;  // Assuming your Repository is here
using AutoMapper;
using OptiRoute360.Services;
using Asp.Versioning;
using OptiRoute360.Data.Interfaces;  // For IMapper

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/attachments")]

    public class AttachmentsController : ControllerBase
    {
        private readonly IRepository<Attachment> _repository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorage;

        public AttachmentsController(
            IRepository<Attachment> repository,
            IUserRepository userRepository,
            IMapper mapper,
            IFileStorageService fileStorage)
        {
            _repository = repository;
            _userRepository = userRepository;
            _mapper = mapper;
            _fileStorage = fileStorage;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AttachmentDto>>> GetAll(
            [FromQuery] Guid? uploadedById = null,
            [FromQuery] string type = null)
        {
            var attachments = await _repository.GetAsync(
                filter: a =>
                    (!uploadedById.HasValue || a.UploadedById == uploadedById.Value) &&
                    (type == null || a.Type == type),
                includes: new[] { nameof(Attachment.UploadedBy) });
            return Ok(_mapper.Map<IEnumerable<AttachmentDto>>(attachments));
        }

        [HttpPost]
        public async Task<ActionResult<AttachmentDto>> Create([FromForm] CreateAttachmentDto dto)
        {
            if (!await _userRepository.ExistsAsync(u => u.Id == dto.UploadedById))
                return BadRequest("Invalid user ID");

            var filePath = await _fileStorage.SaveFileAsync(dto.File);
            var attachment = _mapper.Map<Attachment>(dto);
            attachment.FileUrl = filePath;
            attachment.Size = dto.File.Length.ToString();

            await _repository.AddAsync(attachment);
           // return CreatedAtAction(nameof(GetById), new { id = attachment.Id }, _mapper.Map<AttachmentDto>(attachment));
            return Ok(_mapper.Map<AttachmentDto>(attachment));

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<AttachmentDto>> GetById(Guid id)
        {
            var attachment = await _repository.GetByIdAsync(id, includes: new[] { nameof(Attachment.UploadedBy) });
            if (attachment == null)
                return NotFound();

            return Ok(_mapper.Map<AttachmentDto>(attachment));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var attachment = await _repository.GetByIdAsync(id);
            if (attachment == null)
                return NotFound();

            await _repository.DeleteAsync(attachment);
            return NoContent();
        }
    }
}