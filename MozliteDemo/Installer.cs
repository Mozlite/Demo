using Mozlite;
using Mozlite.Extensions.Installers;
using MozliteDemo.Extensions.Security;
using System.Threading.Tasks;

namespace MozliteDemo
{
    /// <summary>
    /// 安装类。
    /// </summary>
    [Suppress(typeof(DefaultInstaller))]
    public class Installer : DefaultInstaller
    {
        private readonly IUserManager _userManager;
        public Installer(IUserManager userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// 安装时候预先执行的接口。
        /// </summary>
        /// <returns>返回执行结果。</returns>
        public override async Task<InstallerStatus> ExecuteAsync()
        {
            if (!await _userManager.CreateOwnerAsync("管理员", "admin", "admin", current =>
                 {
                     current.Email = "admin@test.com";
                 }))
                return InstallerStatus.Initializing;
            return InstallerStatus.Success;
        }
    }
}