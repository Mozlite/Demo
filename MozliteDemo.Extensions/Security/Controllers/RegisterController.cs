using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Mozlite.Extensions.Settings;
using System;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace MozliteDemo.Extensions.Security.Controllers
{
    /// <summary>
    /// 注册。
    /// </summary>
    public class RegisterController : ControllerBase
    {
        private readonly ISettingsManager _settingsManager;
        private readonly IUserManager _userManager;

        public RegisterController(ISettingsManager settingsManager, IUserManager userManager)
        {
            _settingsManager = settingsManager;
            _userManager = userManager;
        }

        /// <summary>
        /// 注册模型。
        /// </summary>
        public class RegisterModel
        {
            /// <summary>
            /// 用户名称。
            /// </summary>
            public string UserName { get; set; }

            /// <summary>
            /// 密码。
            /// </summary>
            public string Password { get; set; }

            /// <summary>
            /// 确认密码。
            /// </summary>
            public string Confirm { get; set; }

            /// <summary>
            /// 邮件地址。
            /// </summary>
            public string Email { get; set; }

            /// <summary>
            /// 电话号码。
            /// </summary>
            public string Mobile { get; set; }

            /// <summary>
            /// 验证码。
            /// </summary>
            public string Captcha { get; set; }
        }

        /// <summary>
        /// 注册用户。
        /// </summary>
        /// <param name="model">用户实例。</param>
        /// <returns>返回注册结果。</returns>
        [HttpPost]
        public async Task<object> PostAsync([FromBody]RegisterModel model)
        {
            //var settings = await _settingsManager.GetSettingsAsync<SecuritySettings>();
            //if (!settings.Registrable)
            //    return StatusCode(400);
            var user = new User();
            user.UserName = model.UserName;
            user.NormalizedUserName = _userManager.NormalizeKey(model.UserName);
            user.Email = model.Email;
            user.PhoneNumber = model.Mobile;
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                try
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = $"{Request.Scheme}://{Request.Host}/user/confirm-email?userid={user.UserId}&code={code}";
                    callbackUrl = HtmlEncoder.Default.Encode(callbackUrl);
                    await SendEmailAsync(user, "Email_User_Activing", new { callbackUrl });
                    await _userManager.SignInManager.SignInAsync(user, false);
                    Log("注册了新用户。");
                    return Success();
                }
                catch (Exception ex)
                {
                    await _userManager.DeleteAsync(user.UserId);
                    Logger.LogError(ex, "注册用户出现错误：{0}", ex.Message);
                    return Error("注册用户失败，请重新注册，如果一直失败请联系管理员！");
                }
            }
            return Error(result);
        }
    }
}