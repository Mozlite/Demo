using Mozlite;
using Mozlite.Extensions.Categories;

namespace MozliteDemo.Extensions.ProjectManagement
{
    /// <summary>
    /// 团队管理接口。
    /// </summary>
    public interface IGroupManager : ICachableCategoryManager<Group>, ISingletonService
    {

    }
}