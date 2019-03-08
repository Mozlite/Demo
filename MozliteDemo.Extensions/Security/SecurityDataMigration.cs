using Mozlite.Data.Migrations.Builders;
using Mozlite.Extensions.Security.Stores;

namespace MozliteDemo.Extensions.Security
{
    /// <summary>
    /// 数据迁移类。
    /// </summary>
    public class SecurityDataMigration : StoreDataMigration<User, Role, UserClaim, RoleClaim, UserLogin, UserRole, UserToken>
    {
        /// <summary>
        /// 添加用户定义列。
        /// </summary>
        /// <param name="builder">用户表格定义实例。</param>
        protected override void Create(CreateTableBuilder<User> builder)
        {
            builder.Column(x => x.Country)
                .Column(x => x.Province)
                .Column(x => x.City)
                .Column(x => x.Address)
                .Column(x => x.Tags)
                .Column(x => x.Signature);
        }
    }
}