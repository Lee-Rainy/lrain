import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { fileExists } from "@/utils/fs";

export async function POST(req: Request) {
  const body = await req.json();
  const { content, filename } = body;

  if (!content || !filename) {
    return NextResponse.json(
      { message: "Missing content or filename", code: 400 },
      { status: 400 }
    );
  }

  // ⚠️ 注意路径：不能写到 app/ 里
  const filePath = path.join(process.cwd(), "data/posts", `${filename}.md`);
  if (await fileExists(filePath)) {
    return NextResponse.json(
      { message: "File already exists", code: 400 },
      { status: 400 }
    );
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");

  return NextResponse.json({
    success: true,
    path: filePath,
  });
}
