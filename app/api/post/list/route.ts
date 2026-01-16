import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { PostListItem, PostListResponse } from "./type";

const ARTICLE_DIR = path.join(process.cwd(), "data/posts");

export async function GET(): Promise<NextResponse<PostListResponse>> {
  try {
    // Ensure directory exists
    await fs.mkdir(ARTICLE_DIR, { recursive: true });
    const files = await fs.readdir(ARTICLE_DIR);

    const list: PostListItem[] = files
      .filter((name) => name.endsWith(".md"))
      .map((name) => {
        const parts = name.replace(".md", "").split("__");
        if (parts.length < 4) {
          return null;
        }
        const [slug, uuid, createAtStr, updateAtStr] = parts;
        const createAt = Number(createAtStr);
        const updateAt = Number(updateAtStr);

        return {
          id: uuid,
          title: slug.replace(/-/g, " "),
          slug,
          uuid,
          createAt: Number.isFinite(createAt) ? createAt : 0,
          updateAt: Number.isFinite(updateAt) ? updateAt : 0,
          filename: name,
        };
      })
      .filter((item): item is PostListItem => Boolean(item))
      .sort((a, b) => b.updateAt - a.updateAt);
    return NextResponse.json(list);
  } catch (err: unknown) {
    console.error("POST LIST ERROR:", err);
    return NextResponse.json([] as PostListResponse, { status: 500 });
  }
}
