using Mozlite.Extensions;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MozliteDemo.Extensions.ProjectManagement
{
    /// <summary>
    /// 任务。
    /// </summary>
    [Table("pm_Issues")]
    public class Issue : ExtendBase, IIdObject
    {
        /// <summary>
        /// 任务Id。
        /// </summary>
        [Identity]
        public int Id { get; set; }

        /// <summary>
        /// 父级任务Id。
        /// </summary>
        public int ParentId { get; set; }

        /// <summary>
        /// 项目Id。
        /// </summary>
        public int ProjectId { get; set; }

        /// <summary>
        /// 添加的用户Id。
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// 负责人Id。
        /// </summary>
        public int ChargeId { get; set; }

        /// <summary>
        /// 代码仓库Id。
        /// </summary>
        public int RepositoryId { get; set; }

        /// <summary>
        /// 代码分支。
        /// </summary>
        [Size(32)]
        public string Batch { get; set; } = "master";

        /// <summary>
        /// 标题。
        /// </summary>
        [Size(256)]
        public string Title { get; set; }

        /// <summary>
        /// 类型。
        /// </summary>
        public IssueType Type { get; set; }

        /// <summary>
        /// 开始时间。
        /// </summary>
        public DateTimeOffset? StartDate { get; set; }

        /// <summary>
        /// 结束时间。
        /// </summary>
        public DateTimeOffset? EndDate { get; set; }

        /// <summary>
        /// 状态。
        /// </summary>
        public IssueStatus Status { get; set; }

        /// <summary>
        /// 预计小时数。
        /// </summary>
        public int Hours { get; set; }

        /// <summary>
        /// 优先级。
        /// </summary>
        public IssuePriority Priority { get; set; }

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