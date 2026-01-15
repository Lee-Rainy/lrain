"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin.js";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  type LexicalEditor,
  type EditorState,
} from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { TRANSFORMERS } from "@lexical/markdown";
import ToolbarPlugin from "./ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
type Props = {
  initialHTML?: string;
  onChangeHTML?: (html: string) => void;
  placeholder?: string;
  className?: string;
};

function Placeholder({ text }: { text: string }) {
  return (
    <div className="pointer-events-none absolute left-0 top-0 px-6 py-5 text-sm text-muted">
      {text}
    </div>
  );
}

export default function RichTextEditor({
  initialHTML,
  onChangeHTML,
  placeholder = "写点什么吧…",
  className = "",
}: Props) {
  const initialConfig = {
    namespace: "LrainEditor",
    theme: {
      paragraph: "mb-3",
      heading: {
        h1: "text-2xl font-bold mb-3",
        h2: "text-xl font-semibold mb-3",
      },
      quote:
        "border-l-4 border-primary/40 pl-3 text-muted-foreground italic mb-3",
      link: "text-primary underline decoration-2 underline-offset-4",
      text: {
        bold: "font-semibold",
        italic: "italic",
        underline: "underline",
        strikethrough: "line-through",
        code: "rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.85em] text-primary dark:bg-white/5",
        highlight: "bg-yellow-100",
      },
      list: {
        listitem: "mb-1",
      },
    },
    onError(error: Error) {
      console.error(error);
    },
    editorState: initialHTML
      ? (editor: LexicalEditor) => {
          const parser = new DOMParser();
          const dom = parser.parseFromString(initialHTML, "text/html");
          const nodes = $generateNodesFromDOM(editor, dom);
          editor.update(() => {
            const root = $getRoot();
            root.clear();
            nodes.forEach((node) => root.append(node));
          });
        }
      : undefined,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, CodeNode],
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <LexicalComposer initialConfig={initialConfig as any}>
        <ToolbarPlugin />
        <div className="relative rounded-2xl border border-[var(--dropdown-border)] bg-[var(--navbar-bg-color)] px-3 py-2 shadow-sm">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[220px] w-full px-2 py-2 text-[15px] leading-7 text-foreground focus:outline-none" />
            }
            placeholder={<Placeholder text={placeholder} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin
            onChange={(state: EditorState, editor: LexicalEditor) => {
              if (!onChangeHTML) return;
              const html = state.read(() =>
                $generateHtmlFromNodes(editor, null)
              );
              onChangeHTML(html);
            }}
          />
        </div>
      </LexicalComposer>
    </div>
  );
}
