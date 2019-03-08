using Mozlite.Extensions;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MozliteDemo.Extensions.ProjectManagement
{
    /// <summary>
    /// 项目。
    /// </summary>
    [Table("pm_Projects")]
    public class Project : ExtendBase, IIdObject
    {
        /// <summary>
        /// 项目Id。
        /// </summary>
        [Identity]
        public int Id { get; set; }

        /// <summary>
        /// 名称。
        /// </summary>
        [Size(64)]
        public string Name { get; set; }

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
        /// 所属团队Id。
        /// </summary>
        public int GroupId { get; set; }

        /// <summary>
        /// 添加时间。
        /// </summary>
        [NotUpdated]
        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.Now;

        /// <summary>
        /// 最后更新时间。
        /// </summary>
        public DateTimeOffset UpdatedDate { get; set; } = DateTimeOffset.Now;
    }
}