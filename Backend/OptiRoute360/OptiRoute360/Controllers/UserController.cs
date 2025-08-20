using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OptiRoute360.Data.Entities;
using OptiRoute360.Data.Interfaces;
using OptiRoute360.DTOs.User;
using OptiRoute360.Models.Interfaces;
using OptiRoute360.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OptiRoute360.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/users")]
    [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher _passwordHasher;

        public UserController(
            IUserRepository userRepository,
            IMapper mapper,
            IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetAll()
        {
            var users = await _userRepository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<UserResponseDto>>(users));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDto>> GetById(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null || (user.IsDeleted.HasValue && user.IsDeleted.Value))
                return NotFound();
            return Ok(_mapper.Map<UserResponseDto>(user));
        }

        [HttpPost]
        public async Task<ActionResult<UserResponseDto>> Create([FromBody] CreateUserDto dto)
        {
            if (await _userRepository.EmailExistsAsync(dto.Email))
                return Conflict("Email already exists");

            var user = _mapper.Map<User>(dto);
            var (hash, salt) = _passwordHasher.HashPassword(dto.Password);
            user.PasswordHash = hash;
            user.Salt = salt;

            await _userRepository.AddAsync(user);
            return CreatedAtAction(nameof(GetById), new { id = user.Id },
                _mapper.Map<UserResponseDto>(user));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserDto dto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null || (user.IsDeleted.HasValue && user.IsDeleted.Value))
                return NotFound();

            _mapper.Map(dto, user);
            await _userRepository.UpdateAsync(user);
            return NoContent();
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] bool isActive)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null || (user.IsDeleted.HasValue && user.IsDeleted.Value))
                return NotFound();

            user.IsActive = isActive;
            await _userRepository.UpdateAsync(user);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null || (user.IsDeleted.HasValue && user.IsDeleted.Value))
                return NotFound();

            await _userRepository.DeleteAsync(user);
            return NoContent();
        }
    }
}