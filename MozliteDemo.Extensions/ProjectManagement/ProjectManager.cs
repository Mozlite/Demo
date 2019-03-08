using Microsoft.Extensions.Caching.Memory;
using Mozlite.Data;
using Mozlite.Extensions;

namespace MozliteDemo.Extensions.ProjectManagement
{
    /// <summary>
    /// 项目管理类。
    /// </summary>
    public class ProjectManager : CachableObjectManager<Project>, IProjectManager
    {
        private readonly IDbContext<ProjectUser> _pudb;
        /// <summary>
        /// 初始化类<see cref="ProjectManager"/>。
        /// </summary>
        /// <param name="context">数据库操作实例。</param>
        /// <param name="cache">缓存接口。</param>
        /// <param name="pudb">项目关联用户数据库操作接口。</param>
        public ProjectManager(IDbContext<Project> context, IMemoryCache cache, IDbContext<ProjectUser> pudb)
            : base(context, cache)
        {
            _pudb = pudb;
        }
    }
}