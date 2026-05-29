using Microsoft.AspNetCore.Mvc;
using BaseCore.Repository;

namespace BaseCore.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MySqlDbContext _context;

        public AuthController(MySqlDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Vui lòng nhập đầy đủ tài khoản và mật khẩu"
                });
            }

            var user = _context.Users.FirstOrDefault(x =>
                x.UserName == request.UserName &&
                x.Password == request.Password);

            if (user == null)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Sai tài khoản hoặc mật khẩu"
                });
            }

            return Ok(new
            {
                success = true,
                message = "Đăng nhập thành công",
                userName = user.UserName,
                fullName = user.Name,
                role = user.UserType == 1 ? "Admin" : "User"
            });
        }
    }

    public class LoginRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}