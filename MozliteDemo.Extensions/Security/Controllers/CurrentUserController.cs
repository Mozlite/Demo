using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MozliteDemo.Extensions.Security.Controllers
{
    /// <summary>
    /// 当前登录用户。
    /// </summary>
    [Authorize]
    public class CurrentUserController : ControllerBase
    {
        [HttpGet]
        public object Index()
        {
            return new
            {
                userid = User.UserId,
                name = User.UserName,
                User.Avatar,
                User.Province,
                User.City,
                User.Address,
                Tags = User.Tags?.Split(',') ?? new string[0],
                User.Signature
            };
        }
    }
}