using API.Dto;
using API.Method;
using AutoMapper;
using Domain.Model;
using Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.ServiceInterfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly TokenOperations tokenOperations;
        public UserController(IConfiguration configuration, IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
            tokenOperations = new TokenOperations(configuration);
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto model)
        {
            try
            {
                string role = _userService.Authenticate(_mapper.Map<UserCredentials>(model));
                var token = tokenOperations.GenerateToken(role);
                return Ok(token);
            }
            catch (UserNotFound ex)
            {
                return NotFound(ex.Message);
            }
            catch (PasswordNotCorrect ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("first-password-update")]
        public IActionResult UpdatePassword([FromBody] LoginDto model)
        {
            try
            {
                string role = _userService.InitialUpdatePassword(_mapper.Map<UserCredentials>(model));
                var token = tokenOperations.GenerateToken(role);
                return Ok(token);
            }
            catch (UserNotFound ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
