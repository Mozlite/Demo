using Microsoft.Extensions.Caching.Memory;
using Mozlite.Data;
using Mozlite.Extensions.Categories;

namespace MozliteDemo.Extensions.ProjectManagement
{
    /// <summary>
    /// 团队管理。
    /// </summary>
    public class GroupManager : CachableCategoryManager<Group>, IGroupManager
    {
        /// <summary>
        /// 初始化类<see cref="GroupManager"/>。
        /// </summary>
        /// <param name="context">数据库操作实例。</param>
        /// <param name="cache">缓存接口。</param>
        public GroupManager(IDbContext<Group> context, IMemoryCache cache)
            : base(context, cache)
        {
        }
    }
}