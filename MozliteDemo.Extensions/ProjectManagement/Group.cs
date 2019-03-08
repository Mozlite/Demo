using Mozlite.Extensions;
using Mozlite.Extensions.Categories;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MozliteDemo.Extensions.ProjectManagement
{
    /// <summary>
    /// 团队。
    /// </summary>
    [Table("pm_Groups")]
    public class Group : CategoryBase
    {
        /// <summary>
        /// 唯一键。
        /// </summary>
        [Size(32)]
        public string Key { get; set; }

        /// <summary>
        /// 图标。
        /// </summary>
        [Size(256)]
        public string IconUrl { get; set; }

        /// <summary>
        /// 标签。
        /// </summary>
        [Size(256)]
        public string Tags { get; set; }

        /// <summary>
        /// 描述。
        /// </summary>
        [Size(256)]
        public string Description { get; set; }

        /// <summary>
        /// 项目数。
        /// </summary>
        [NotUpdated]
        public int Projects { get; set; }

        /// <summary>
        /// 成员数。
        /// </summary>
        [NotUpdated]
        public int Users { get; set; }

        /// <summary>
        /// 所有者Id。
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// 添加时间。
        /// </summary>
        [NotUpdated]
        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.Now;
    }
}