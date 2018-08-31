using Microsoft.AspNetCore.Identity;
using Mozlite.Data;
using Mozlite.Extensions.Security;
using Mozlite.Extensions.Security.Stores;

namespace Demo.Extensions.Security.Stores
{
    /// <summary>
    /// 用户存储。
    /// </summary>
    public class UserStore : UserStoreBase<User, Role, UserClaim, UserRole, UserLogin, UserToken, RoleClaim>
    {
        public UserStore(IdentityErrorDescriber describer, IDbContext<User> userContext, IDbContext<UserClaim> userClaimContext, IDbContext<UserLogin> userLoginContext, IDbContext<UserToken> userTokenContext, IDbContext<Role> roleContext, IDbContext<UserRole> userRoleContext, IDbContext<RoleClaim> roleClaimContext, IRoleManager roleManager) 
            : base(describer, userContext, userClaimContext, userLoginContext, userTokenContext, roleContext, userRoleContext, roleClaimContext, roleManager)
        {
        }
    }
}