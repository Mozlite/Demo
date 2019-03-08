using Microsoft.AspNetCore.Mvc;

namespace MozliteDemo.Extensions.ProjectManagement.Controllers
{
    /// <summary>
    /// 控制器基类。
    /// </summary>
    [Route("api/project-management/[controller]")]
    public abstract class ControllerBase : Extensions.ControllerBase
    {

    }
}