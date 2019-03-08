using Microsoft.AspNetCore.Mvc;
using Mozlite.Extensions.Settings;
using System.Threading.Tasks;

namespace MozliteDemo.Extensions
{
    /// <summary>
    /// 配置控制器。
    /// </summary>
    public class SettingController : ControllerBase
    {
        private readonly ISettingsManager _settingsManager;

        public SettingController(ISettingsManager settingsManager)
        {
            _settingsManager = settingsManager;
        }

        [HttpGet]
        public async Task<object> Index()
        {
            return await _settingsManager.GetSettingsAsync<SiteSettings>();
        }
    }
}