import Card from "@/components/Card";
import Link from "next/link";

export default function Pannel() {
  const liveTags = [
    { label: "动效", tone: "bg-primary/10 text-primary" },
    { label: "手绘感", tone: "bg-scribble/60 text-foreground" },
    { label: "微交互", tone: "bg-mint/30 text-foreground" },
    { label: "可访问性", tone: "bg-accent/60 text-foreground" },
    { label: "Next.js 13+", tone: "bg-primary/10 text-primary" },
  ];

  const latestPosts = [
    { title: "SVG 手绘曲线动画实践", href: "/blog" },
    { title: "用 Framer Motion 做轻量微交互", href: "/blog" },
    { title: "组件配色与可读性小贴士", href: "/blog" },
  ];

  const picks = [
    { title: "我最爱的 3 个 UI 灵感站点", href: "/blog" },
    { title: "前端人也能画：简单手绘技巧", href: "/blog" },
  ];

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold text-foreground">
            实时标签
          </span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-muted">
            live tags
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {liveTags.map((tag) => (
            <span
              key={tag.label}
              className={`inline-flex items-center px-3 py-1 rounded-full border border-black/5 dark:border-white/10 text-xs font-medium ${tag.tone}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">
            最新文章
          </span>
          <Link href="/blog" className="text-xs text-primary hover:underline">
            全部
          </Link>
        </div>
        <div className="space-y-2">
          {latestPosts.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="block px-3 py-2 rounded-md hover:bg-[var(--menu-hover-bg)] hover:text-[var(--menu-hover-text)] transition-colors text-sm text-foreground"
            >
              {post.title}
            </Link>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">
            推荐内容
          </span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-muted">
            picks
          </span>
        </div>
        <div className="space-y-2">
          {picks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block px-3 py-2 rounded-md hover:bg-[var(--menu-hover-bg)] hover:text-[var(--menu-hover-text)] transition-colors text-sm text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </Card>
    </aside>
  );
}
