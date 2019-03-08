using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Mozlite.Extensions.Messages;
using Mozlite.Extensions.Security;
using Mozlite.Mvc.Apis;
using MozliteDemo.Extensions.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MozliteDemo.Extensions
{
    /// <summary>
    /// 控制器基类。
    /// </summary>
    public abstract class ControllerBase : ApiControllerBase
    {
        private User _user;
        /// <summary>
        /// 当前用户。
        /// </summary>
        protected new User User => _user ?? (_user = HttpContext.GetUser<User>());

        private Role _role;
        /// <summary>
        /// 当前用户角色。
        /// </summary>
        protected Role Role => _role ?? (_role = GetRequiredService<IRoleManager>().FindById(User.RoleId));

        /// <summary>
        /// 返回状态对象。
        /// </summary>
        /// <param name="status">状态描述。</param>
        /// <returns>返回匿名对象。</returns>
        protected IActionResult Status(string status) => Ok(new { status });

        /// <summary>
        /// 返回成功状态对象。
        /// </summary>
        /// <returns>返回匿名对象。</returns>
        protected IActionResult Success() => Status("ok");

        /// <summary>
        /// 返回成功状态对象。
        /// </summary>
        /// <returns>返回匿名对象。</returns>
        protected IActionResult Success(object result) => Ok(new { status = "ok", data = result });

        /// <summary>
        /// 失败对象。
        /// </summary>
        /// <param name="msg">失败消息。</param>
        /// <returns>返回失败对象。</returns>
        protected IActionResult Error(string msg = null)
        {
            var dic = new Dictionary<string, string>();
            foreach (var key in ModelState.Keys)
            {
                var error = ModelState[key].Errors.FirstOrDefault()?.ErrorMessage;
                if (string.IsNullOrEmpty(key))
                    msg = msg ?? error;
                else
                    dic[key] = error;
            }
            if (dic.Count > 0)
                return Json(new { status = "error", msg, states = dic });
            return Json(new { status = "error", msg });
        }

        /// <summary>
        /// 失败对象。
        /// </summary>
        /// <param name="result">失败结果。</param>
        /// <returns>返回失败对象。</returns>
        protected IActionResult Error(IdentityResult result)
        {
            return Json(new { status = "error", msg = result.Errors.FirstOrDefault()?.Description });
        }

        /// <summary>
        /// 发送电子邮件。
        /// </summary>
        /// <param name="resourceKey">资源键：<paramref name="resourceKey"/>_{Title}，<paramref name="resourceKey"/>_{Content}。</param>
        /// <param name="replacement">替换对象，使用匿名类型实例。</param>
        /// <param name="action">实例化方法。</param>
        /// <returns>返回发送结果。</returns>
        protected bool SendEmail(string resourceKey, object replacement = null, Action<Email> action = null) => SendEmail(User, resourceKey, replacement, action);

        /// <summary>
        /// 发送电子邮件。
        /// </summary>
        /// <param name="resourceKey">资源键：<paramref name="resourceKey"/>_{Title}，<paramref name="resourceKey"/>_{Content}。</param>
        /// <param name="replacement">替换对象，使用匿名类型实例。</param>
        /// <param name="action">实例化方法。</param>
        /// <returns>返回发送结果。</returns>
        protected Task<bool> SendEmailAsync(string resourceKey, object replacement = null, Action<Email> action = null) => SendEmailAsync(User, resourceKey, replacement, action);
    }
}