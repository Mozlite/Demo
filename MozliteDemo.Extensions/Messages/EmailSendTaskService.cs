using Microsoft.Extensions.Logging;
using Mozlite.Extensions.Messages;
using Mozlite.Extensions.Settings;

namespace MozliteDemo.Extensions.Messages
{
    /// <summary>
    /// 电子邮件发送服务。
    /// </summary>
    public class EmailSendTaskService : Mozlite.Extensions.Messages.EmailSendTaskService
    {
        /// <summary>
        /// 初始化类<see cref="EmailSendTaskService"/>。
        /// </summary>
        /// <param name="settingsManager">配置管理接口。</param>
        /// <param name="messageManager">消息管理接口。</param>
        /// <param name="logger">日志接口。</param>
        public EmailSendTaskService(ISettingsManager settingsManager, IMessageManager messageManager, ILogger<EmailSendTaskService> logger)
            : base(settingsManager, messageManager, logger)
        {
        }
    }
}