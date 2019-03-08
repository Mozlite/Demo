using Microsoft.AspNetCore.Mvc;
using Mozlite.Mvc.Apis;
using System.Threading.Tasks;

namespace MozliteDemo.Extensions.ProjectManagement.Controllers
{
    /// <summary>
    /// 团队。
    /// </summary>
    public class GroupController : ControllerBase
    {
        private readonly IGroupManager _groupManager;
        public GroupController(IGroupManager groupManager)
        {
            _groupManager = groupManager;
        }

        [HttpGet("list")]
        public async Task<ApiResult> Index()
        {
            return Data(await _groupManager.FetchAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ApiResult> Index(int id)
        {
            return Data(await _groupManager.FindAsync(id));
        }

        [HttpPost]
        public async Task<ApiResult> Save([FromBody]Group model)
        {
            var result = await _groupManager.SaveAsync(model);
            if (result)
                return Succeeded();
            return result.ToString("团队");
        }

        [HttpDelete("delete")]
        public async Task<ApiResult> Delete([FromBody]int[] ids)
        {
            var result = await _groupManager.DeleteAsync(ids);
            if (result)
                return Succeeded();
            return result.ToString("团队");
        }
    }
}