import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { generateFilename } from "@/utils/article";

const ARTICLE_DIR = path.join(process.cwd(), "data/posts");

export async function POST(req: Request) {
  const body = await req.json();
  const { content, filename } = body;

  if (!content || !filename) {
    return NextResponse.json(
      { message: "Missing content or filename", code: 400 },
      { status: 400 }
    );
  }

  const files = await fs.readdir(ARTICLE_DIR);
  if (files.includes(filename)) {
    return NextResponse.json(
      { message: "File already exists", code: 400 },
      { status: 400 }
    );
  }

  await fs.mkdir(ARTICLE_DIR, { recursive: true });
  const FileInfo = generateFilename(filename);
  const filePath = path.join(ARTICLE_DIR, FileInfo.filename);

  await fs.writeFile(filePath, content, "utf-8");

  return NextResponse.json({
    success: true,
    path: filePath,
  });
}
