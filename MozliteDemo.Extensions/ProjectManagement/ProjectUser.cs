using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MozliteDemo.Extensions.ProjectManagement
{
    /// <summary>
    /// 项目用户。
    /// </summary>
    [Table("pm_Projects_Users")]
    public class ProjectUser
    {
        /// <summary>
        /// 用户Id。
        /// </summary>
        [Key]
        public int UserId { get; set; }

        /// <summary>
        /// 项目Id。
        /// </summary>
        [Key]
        public int ProjectId { get; set; }

        /// <summary>
        /// 团队Id。
        /// </summary>
        [Key]
        public int GroupId { get; set; }
    }
}