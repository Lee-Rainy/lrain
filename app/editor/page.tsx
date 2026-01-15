"use client";

import { http } from "@/utils/request";
import { useState } from "react";
import RucgTextEditor from "@/components/editor/RichTextEditor";

export default function Editor() {
  const [content, setContent] = useState("");
  const [filename, setFilename] = useState("test");

  const saveMd = async () => {
    try {
      const res = await http.post("/api/md", {
        content,
        filename,
      });
      if (res.code === 200) {
        alert("保存成功");
      }
    } catch (error) {
      alert(`保存失败,${error}`);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      {/* <span>文件名</span>
      <input
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        placeholder="文件名"
      /> */}
      <RucgTextEditor onChangeHTML={setContent} />
      {/* <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
        style={{ width: "100%" }}
      /> */}

      <button onClick={saveMd}>保存 MD</button>
    </div>
  );
}
