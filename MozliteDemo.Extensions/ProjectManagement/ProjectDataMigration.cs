using Mozlite.Data.Migrations;
using Mozlite.Data.Migrations.Builders;
using Mozlite.Extensions;
using MozliteDemo.Extensions.Security;

namespace MozliteDemo.Extensions.ProjectManagement
{
    /// <summary>
    /// 项目数据库迁移类。
    /// </summary>
    public class ProjectDataMigration : ObjectDataMigration<Project>
    {
        /// <summary>
        /// 添加列。
        /// </summary>
        /// <param name="table">表格构建实例。</param>
        protected override void Create(CreateTableBuilder<Project> table)
        {
            table.Column(x => x.Key)
                .Column(x => x.Name)
                .Column(x => x.IconUrl)
                .Column(x => x.Tags)
                .Column(x => x.Description)
                .Column(x => x.GroupId, defaultValue: 0)
                .Column(x => x.CreatedDate)
                .Column(x => x.UpdatedDate)
                .Column(x => x.ExtendProperties)
                .ForeignKey<Group>(x => x.GroupId, x => x.Id, onDelete: ReferentialAction.SetDefault);
        }

        /// <summary>
        /// 当模型建立时候构建的表格实例。
        /// </summary>
        /// <param name="builder">迁移实例对象。</param>
        public override void Create(MigrationBuilder builder)
        {
            base.Create(builder);

            builder.CreateTable<ProjectUser>(table => table
                .Column(x => x.UserId)
                .Column(x => x.ProjectId)
                .Column(x => x.GroupId)
                .ForeignKey<User>(x => x.UserId, x => x.UserId, onDelete: ReferentialAction.Cascade)
                .ForeignKey<ProjectUser>(x => x.ProjectId, x => x.ProjectId, onDelete: ReferentialAction.Cascade)
                .ForeignKey<Group>(x => x.GroupId, x => x.Id, onDelete: ReferentialAction.Cascade)
            );
        }
    }
}