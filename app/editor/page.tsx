"use client";

import { http } from "@/utils/request";
import { useEffect, useMemo, useState } from "react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { useParams } from "next/navigation";

const HARDCODE_KEY = "secret-demo-key";

export default function Editor() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [filename, setFilename] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [auth, setAuth] = useState<"pending" | "ok" | "deny">("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get("id");
    setAuth(id === HARDCODE_KEY ? "ok" : "deny");
  }, []);

  const filenameHint = useMemo(() => {
    if (title) return title.trim().replace(/\s+/g, "-").toLowerCase();
    return "my-article";
  }, [title]);

  const saveMd = async () => {
    if (auth !== "ok") {
      alert("鉴权失败，缺少或错误的 key");
      return;
    }
    if (!content.trim() || !filename.trim()) {
      alert("请填写文件名与内容");
      return;
    }
    try {
      setLoading(true);
      const res = await http.post("/api/post/save", {
        content,
        filename,
        title,
        slug,
        musicUrl,
      });
      // save route currently returns {success?, path?} or code
      if ((res as any).code === 200 || (res as any).success) {
        alert("保存成功");
      } else {
        alert(`保存失败：${JSON.stringify(res)}`);
      }
    } catch (error: any) {
      alert(`保存失败, ${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-paper)] px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">文章编辑器</h1>
            <p className="text-sm text-muted">
              支持添加/编辑，并可配置背景音乐。
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveMd}
              disabled={loading || auth !== "ok"}
              className="btn btn-primary"
            >
              {loading ? "保存中..." : "保存"}
            </button>
            <button
              onClick={() => {
                setTitle("");
                setSlug("");
                setFilename("");
                setMusicUrl("");
                setContent("");
              }}
              className="btn btn-outline"
            >
              重置
            </button>
          </div>
        </header>

        {auth === "deny" && (
          <div className="p-4 rounded-xl border border-red-200 text-red-700 bg-red-50">
            鉴权失败：请在 URL 参数中添加 ?key=secret-demo-key
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="scribble-card space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">标题</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="如：手绘风动效指南"
                  className="rounded-lg border border-[var(--dropdown-border)] bg-white/70 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">Slug（可选）</span>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="custom-slug"
                  className="rounded-lg border border-[var(--dropdown-border)] bg-white/70 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">文件名（保存用，必填）</span>
                <input
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder={filenameHint}
                  className="rounded-lg border border-[var(--dropdown-border)] bg-white/70 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">背景音乐 URL（可选）</span>
                <input
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                  placeholder="https://example.com/bgm.mp3"
                  className="rounded-lg border border-[var(--dropdown-border)] bg-white/70 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <RichTextEditor onChangeHTML={setContent} />
          </div>

          <div className="space-y-4">
            <div className="scribble-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  发布设置
                </span>
              </div>
              <ul className="text-sm text-muted space-y-1">
                <li>· 必填：文件名、正文</li>
                <li>· 选填：标题、Slug、背景音乐</li>
                <li>· 鉴权：URL 参数 ?key=secret-demo-key</li>
              </ul>
            </div>
            <div className="scribble-card space-y-3">
              <span className="text-sm font-semibold text-foreground">
                预览信息
              </span>
              <div className="text-sm text-muted">
                <div>标题：{title || "（未填写）"}</div>
                <div>Slug：{slug || "（未填写）"}</div>
                <div>文件名：{filename || filenameHint}</div>
                <div>背景音乐：{musicUrl || "（未设置）"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
