using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MozliteDemo.Extensions.Security.Activities;
using System;
using System.Threading.Tasks;

namespace MozliteDemo.Extensions.Security.Controllers
{
    /// <summary>
    /// 用户登录。
    /// </summary>
    public class LoginController : ControllerBase
    {
        private readonly IUserManager _userManager;
        public LoginController(IUserManager userManager)
        {
            this._userManager = userManager;
        }

        /// <summary>
        /// 登录类型。
        /// </summary>
        public enum LoginType
        {
            /// <summary>
            /// 账户。
            /// </summary>
            Account,
            /// <summary>
            /// 电话验证码。
            /// </summary>
            Mobile,
        }

        /// <summary>
        /// 登录模型。
        /// </summary>
        public class LoginModel
        {
            /// <summary>
            /// 用户名或者电子邮件。
            /// </summary>
            public string UserName { get; set; }

            /// <summary>
            /// 密码。
            /// </summary>
            public string Password { get; set; }

            /// <summary>
            /// 登录类型。
            /// </summary>
            public LoginType Type { get; set; }

            /// <summary>
            /// 电话号码。
            /// </summary>
            public string Mobile { get; set; }

            /// <summary>
            /// 短信验证码。
            /// </summary>
            public string Captcha { get; set; }

            /// <summary>
            /// 保持登录状态。
            /// </summary>
            public bool AutoLogin { get; set; }
        }

        /// <summary>
        /// 登录验证。
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody]LoginModel model)
        {
            try
            {
                model.UserName = model.UserName.Trim();
                model.Password = model.Password.Trim();
                var result = await _userManager.PasswordSignInAsync(model.UserName, model.Password, model.AutoLogin,
                    async user =>
                    {
                        await GetRequiredService<IActivityManager>().CreateAsync(SecuritySettings.EventId, "成功登入系统.", user.UserId);
                    });
                if (result.Succeeded)
                    return Success();

                if (result.RequiresTwoFactor)
                    return Status("2fa");

                if (result.IsLockedOut)
                {
                    Logger.LogWarning($"账户[{model.UserName}]被锁定。");
                    return Error("账户被锁定！");
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, $"账户[{model.UserName}]登陆失败:{ex.Message}");
            }
            Logger.LogWarning($"账户[{model.UserName}]登陆失败。");
            return Error("用户名或密码错误！");
        }
    }
}