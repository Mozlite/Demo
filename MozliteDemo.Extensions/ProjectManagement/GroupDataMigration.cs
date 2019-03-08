using Mozlite.Data.Migrations.Builders;
using Mozlite.Extensions.Categories;

namespace MozliteDemo.Extensions.ProjectManagement
{
    /// <summary>
    /// 团队数据库迁移类。
    /// </summary>
    public class GroupDataMigration : CategoryDataMigration<Group>
    {
        /// <summary>
        /// 优先级，在两个迁移数据需要先后时候使用。
        /// </summary>
        public override int Priority => 5;

        /// <summary>
        /// 编辑表格其他属性列。
        /// </summary>
        /// <param name="table">当前表格构建实例对象。</param>
        protected override void Create(CreateTableBuilder<Group> table)
        {
            base.Create(table);
            table.Column(x => x.Key)
                .Column(x => x.IconUrl)
                .Column(x => x.UserId)
                .Column(x => x.Tags)
                .Column(x => x.Description)
                .Column(x => x.Projects)
                .Column(x => x.Users)
                .Column(x => x.CreatedDate);
        }
    }
}