using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mozlite.Extensions.Security.Activities;
using System.Threading.Tasks;

namespace MozliteDemo.Extensions.Security.Controllers
{
    /// <summary>
    /// 退出登录。
    /// </summary>
    [Authorize]
    public class LogoutController : ControllerBase
    {
        private readonly IUserManager _userManager;
        public LogoutController(IUserManager userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// 推出登录。
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _userManager.SignOutAsync();
            Logger.Info(SecuritySettings.EventId, "退出登陆。");
            return Success();
        }
    }
}