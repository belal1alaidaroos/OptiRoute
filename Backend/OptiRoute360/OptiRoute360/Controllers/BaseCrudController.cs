using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OptiRoute360.Data.Repositories;
using OptiRoute360.Services;
using OptiRoute360.Data.Entities;

namespace OptiRoute360.Controllers
{
    [ApiController]
    public abstract class BaseCrudController<TEntity, TDto, TCreateDto, TUpdateDto> : ControllerBase
    where TEntity : BaseEntity  // ← Add this constraint
    where TDto : class
    where TCreateDto : class
    where TUpdateDto : class
    {
        protected readonly IRepository<TEntity> _repository;
        protected readonly IMapper _mapper;
        protected readonly ICurrentUserService _currentUserService;

        public BaseCrudController(
            IRepository<TEntity> repository,
            IMapper mapper,
            ICurrentUserService currentUserService)
        {
            _repository = repository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        // GET: api/v1/{entities}
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TDto>>> GetAll()
        {
            var entities = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<TDto>>(entities));
        }

        // GET: api/v1/{entities}/{id}
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TDto>> GetById(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<TDto>(entity));
        }

        // POST: api/v1/{entities}
        [HttpPost]
        public virtual async Task<ActionResult<TDto>> Create(TCreateDto createDto)
        {
            var entity = _mapper.Map<TEntity>(createDto);

            // Optional: Track creation metadata
            if (entity is IAuditable auditableEntity)
            {
                auditableEntity.CreatedBy = _currentUserService.UserId;
                auditableEntity.CreatedAt = DateTime.UtcNow;
            }

            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();

            var dto = _mapper.Map<TDto>(entity);
            return CreatedAtAction(nameof(GetById), new { id = GetEntityId(entity) }, dto);
        }

        // PUT: api/v1/{entities}/{id}
        [HttpPut("{id}")]
        public virtual async Task<ActionResult<TDto>> Update(Guid id, TUpdateDto updateDto)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, entity);

            // Optional: Track update metadata
            if (entity is IAuditable auditableEntity)
            {
                auditableEntity.UpdatedBy = _currentUserService.UserId;
                auditableEntity.UpdatedAt = DateTime.UtcNow;
            }

            await _repository.UpdateAsync(entity);
            await _repository.SaveChangesAsync();

            return Ok(_mapper.Map<TDto>(entity));
        }

        // DELETE: api/v1/{entities}/{id}
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(entity);
            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // Helper method to extract entity ID (override if needed)
        protected virtual Guid GetEntityId(TEntity entity)
        {
            return (Guid)entity.GetType().GetProperty("Id")?.GetValue(entity);
        }
    }

    // Optional: Interface for auditable entities (track creation/modification)
   
}