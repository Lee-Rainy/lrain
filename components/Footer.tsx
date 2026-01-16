import { Github, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    // <footer className="pt-8 pb-4 text-center text-sm text-muted">
    //   © {new Date().getFullYear()} Lrain · 手绘风个人站
    // </footer>
    <footer className="bg-[#f8f5ee] border-t border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 上半部分 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          {/* 品牌与介绍 */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
              lrain
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              在这里记录技术探索、生活随笔与思考。保持好奇，持续输出。
            </p>
          </div>

          {/* 导航链接 1 */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              内容
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <a
                  href="/posts"
                  className="hover:text-blue-500 transition-colors"
                >
                  所有文章
                </a>
              </li>
              <li>
                <a
                  href="/categories"
                  className="hover:text-blue-500 transition-colors"
                >
                  专题分类
                </a>
              </li>
              <li>
                <a
                  href="/archive"
                  className="hover:text-blue-500 transition-colors"
                >
                  归档中心
                </a>
              </li>
            </ul>
          </div>

          {/* 导航链接 2 */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              关于
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-500 transition-colors"
                >
                  关于博主
                </a>
              </li>
              <li>
                <a
                  href="/friends"
                  className="hover:text-blue-500 transition-colors"
                >
                  友情链接
                </a>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  className="hover:text-blue-500 transition-colors"
                >
                  RSS 订阅
                </a>
              </li>
            </ul>
          </div>

          {/* 社交媒体与动态 */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              关注我
            </h3>
            <div className="flex space-x-4">
              {/* 这里可以使用 Lucide-react 或 FontAwesome 图标 */}
              <a
                href="#"
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                <Github />
              </a>
              <a
                href="#"
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                <Twitter />
              </a>
              <a
                href="#"
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 mb-8" />

        {/* 下半部分：版权与备案 */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 dark:text-zinc-500 space-y-4 md:space-y-0">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} . All rights reserved.</span>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              className="hover:underline"
            >
              京ICP备XXXXXXXX号-1
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>站点已运行 1,024 天</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
