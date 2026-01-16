import MusicPlayer from "@/components/MusicPlayer";
import { http } from "@/utils/request";
import Card from "../components/Card";
import Pannel from "./components/Pannel";
import { PostListResponse } from "./api/post/list/type";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1.5 h-7 rounded bg-primary shadow-sm" />
      <h3 className="text-xl font-bold text-foreground font-handwritten tracking-wide">
        {children}
      </h3>
    </div>
  );
}

export default async function Home() {
  const { data } = await http.get<PostListResponse>(
    "http://localhost:3000/api/post/list"
  );

  return (
    <div className="flex flex-col items-center py-12 px-4 sm:px-6 relative">
      {/* <div className="fixed left-16 top-32 w-[164px] z-100">
        <div className="w-full h-full">
          <MusicPlayer />
        </div>
      </div> */}
      <main
        id="main-content"
        role="main"
        className="w-full max-w-5xl grid gap-10 lg:grid-cols-[2fr_1fr] items-start"
      >
        <div className="space-y-12">
          {/* Hero */}
          <header className="relative">
            {/* <div className="absolute top-0 right-0 z-10">
                <ThemeToggle />
              </div> */}

            <Card className="w-full max-w-2xl mx-auto p-8 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div
                  role="img"
                  aria-label="头像"
                  className="w-24 h-24 rounded-full bg-scribble border-4 border-white/50 dark:border-white/10 flex items-center justify-center text-4xl font-handwritten shadow-inner"
                >
                  <span className="sr-only">头像</span>
                  👋
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <h1 className="text-4xl sm:text-5xl font-handwritten font-bold text-foreground leading-tight">
                    你好，我是 lrain
                  </h1>
                  <p className="text-base text-muted font-medium">
                    前端爱好者 · 喜欢手绘风与微交互
                  </p>
                </div>
              </div>

              <div className="mt-8 mb-6">
                <svg
                  className="hand-accent-svg text-primary"
                  viewBox="0 0 280 24"
                  aria-hidden
                >
                  <path
                    className="path"
                    d="M4 12 C44 2 84 22 140 10 C196 -2 236 16 276 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </div>

              <p className="text-foreground/80 leading-relaxed text-lg">
                这是一个亲和、手绘风格的个人主页示例。你可以替换头像、简介与作品内容。
              </p>
            </Card>
          </header>

          {/* About */}
          <section>
            <SectionTitle>关于我</SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <p className="text-foreground leading-relaxed">
                  我热衷于构建友好且有趣的用户界面，喜欢将手绘元素和微动画融合进页面设计，让产品更有温度。
                </p>
              </Card>
              <Card>
                <h4 className="font-bold mb-2 text-primary">技能</h4>
                <p className="text-foreground leading-relaxed">
                  HTML / CSS / JavaScript <br />
                  React / Next.js / Tailwind CSS <br />
                  UI/UX Design
                </p>
              </Card>
            </div>
          </section>

          <section>
            <MusicPlayer />
          </section>

          {/* Projects */}
          <section>
            <SectionTitle>作品</SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2">
              {data.map((item) => (
                <Card key={item.id} className="h-full flex flex-col">
                  <article role="article" aria-labelledby="proj-a">
                    <div className="mb-3 w-10 h-10 rounded-full bg-mint/50 flex items-center justify-center text-xl">
                      🎨
                    </div>
                    <h4
                      id="proj-a"
                      className="text-xl font-bold mb-2 font-handwritten"
                    >
                      {item.title}
                    </h4>
                    <p className="text-sm text-foreground/80">
                      一个注重体验的小工具，使用了动画与 SVG 插画。
                    </p>
                  </article>
                </Card>
              ))}
              <Card className="h-full flex flex-col">
                <article role="article" aria-labelledby="proj-a">
                  <div className="mb-3 w-10 h-10 rounded-full bg-mint/50 flex items-center justify-center text-xl">
                    🎨
                  </div>
                  <h4
                    id="proj-a"
                    className="text-xl font-bold mb-2 font-handwritten"
                  >
                    示例项目 A
                  </h4>
                  <p className="text-sm text-foreground/80">
                    一个注重体验的小工具，使用了动画与 SVG 插画。
                  </p>
                </article>
              </Card>
              <Card className="h-full flex flex-col">
                <article role="article" aria-labelledby="proj-b">
                  <div className="mb-3 w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-xl">
                    📝
                  </div>
                  <h4
                    id="proj-b"
                    className="text-xl font-bold mb-2 font-handwritten"
                  >
                    示例项目 B
                  </h4>
                  <p className="text-sm text-foreground/80">
                    一个简单的作品集页面，展示图片与项目描述。
                  </p>
                </article>
              </Card>
            </div>
          </section>

          {/* Contact */}
          <section>
            <SectionTitle>联系我</SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="flex items-center gap-4">
                <div className="text-2xl">📧</div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-bold">
                    邮箱
                  </p>
                  <p className="text-foreground font-medium">
                    example@example.com
                  </p>
                </div>
              </Card>
              <Card className="flex items-center gap-4">
                <div className="text-2xl">🌏</div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-bold">
                    社交
                  </p>
                  <p className="text-foreground font-medium">
                    GitHub / Twitter / 微信
                  </p>
                </div>
              </Card>
            </div>
          </section>
        </div>

        <Pannel />
      </main>
    </div>
  );
}
