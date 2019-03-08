namespace MozliteDemo.Extensions.ProjectManagement
{
    /// <summary>
    /// 任务状态。
    /// </summary>
    public enum IssueStatus
    {
        /// <summary>
        /// 代办的。
        /// </summary>
        Pending,
        /// <summary>
        /// 进行中。
        /// </summary>
        Ongoing,
        /// <summary>
        /// 已完成。
        /// </summary>
        Completed,
        /// <summary>
        /// 已验收。
        /// </summary>
        Acceptance,
        /// <summary>
        /// 已拒绝。
        /// </summary>
        Refused,
    }
}