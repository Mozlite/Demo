namespace MozliteDemo.Extensions
{
    /// <summary>
    /// 网站配置。
    /// </summary>
    public class SiteSettings
    {
        /// <summary>
        /// 标题。
        /// </summary>
        public string Title { get; set; } = "Mozlite Demo";

        /// <summary>
        /// 描述。
        /// </summary>
        public string Description { get; set; } = "Mozlite Demo by pro.ant.design";

        /// <summary>
        /// 版权。
        /// </summary>
        public string Copyright { get; set; }

        /// <summary>
        /// 主色调。
        /// </summary>
        public string PrimaryColor { get; set; } = "#722ED1";

        /// <summary>
        /// 弱色调。
        /// </summary>
        public bool ColorWeak { get; set; }
    }
}