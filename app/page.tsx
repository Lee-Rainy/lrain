import Image from "next/image";
import ThemeToggle from "../components/ThemeToggle";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-7 rounded bg-primary" />
      <h3 className="text-lg font-semibold text-gray-800">{children}</h3>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <main id="main-content" role="main" className="w-full max-w-4xl px-2 sm:px-4">
        {/* Hero */}
        <header className="mb-10">
          <div className="flex justify-end mb-3">
            <ThemeToggle />
          </div>
          <div className="scribble-card w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <div role="img" aria-label="头像占位" className="w-20 h-20 rounded-full bg-scribble flex items-center justify-center text-2xl font-handwritten"><span className="sr-only">头像占位</span>你</div>
              <div className="text-left">
                <h1 className="text-3xl sm:text-4xl font-handwritten leading-tight">你好，我是 Lrain</h1>
                <p className="mt-1 text-sm text-muted">前端爱好者 · 喜欢手绘风与微交互</p>
              </div>
            </div>

            <div className="mt-4">
              <svg className="hand-accent-svg" viewBox="0 0 280 24" aria-hidden>
                <path className="path" d="M4 12 C44 2 84 22 140 10 C196 -2 236 16 276 10" stroke="#FF8A80" strokeWidth="3" fill="none" />
              </svg>
            </div>

            <p className="mt-4 text-sm text-foreground">这是一个亲和、手绘风格的个人主页示例。你可以替换头像、简介与作品内容。</p>
          </div>
        </header>

        {/* About */}
        <section className="mb-8">
          <SectionTitle>关于我</SectionTitle>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="scribble-card">
              <p className="text-sm text-foreground">我热衷于构建友好且有趣的用户界面，喜欢将手绘元素和微动画融合进页面设计，让产品更有温度。</p>
            </div>
            <div className="scribble-card">
              <p className="text-sm text-foreground">技能：HTML / CSS / JavaScript / React / Next.js / Tailwind CSS</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <SectionTitle>作品</SectionTitle>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <article role="article" aria-labelledby="proj-a" className="scribble-card">
              <h4 id="proj-a" className="font-semibold">示例项目 A</h4>
              <p className="mt-1 text-sm text-foreground">一个注重体验的小工具，使用了动画与 SVG 插画。</p>
            </article>
            <article role="article" aria-labelledby="proj-b" className="scribble-card">
              <h4 id="proj-b" className="font-semibold">示例项目 B</h4>
              <p className="mt-1 text-sm text-foreground">一个简单的作品集页面，展示图片与项目描述。</p>
            </article>
          </div>
        </section>

        {/* Contact */}
        <section>
          <SectionTitle>联系我</SectionTitle>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="scribble-card">
              <p className="text-sm">邮箱：<strong>example@example.com</strong></p>
            </div>
            <div className="scribble-card">
              <p className="text-sm">社交：<strong>GitHub / Twitter / 微信</strong></p>
            </div>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-muted">© {new Date().getFullYear()} Lrain · 手绘风个人站</footer>
      </main>
    </div>
  );
}
