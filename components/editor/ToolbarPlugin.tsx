"use client";

import {
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  type LexicalEditor,
} from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
} from "@lexical/list";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from "lexical";
import { $setBlocksType, $patchStyleText } from "@lexical/selection";
import React, { useCallback, useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  ListTodo,
  Link as LinkIcon,
  Undo,
  Redo,
  Highlighter,
  Heading1,
  Heading2,
  Type,
  ChevronDown,
} from "lucide-react";
import { Dropdown } from "../Dropdown";
import { DropdownItem } from "../DropdownItem";

type BlockType = "paragraph" | "h1" | "h2" | "quote";

function applyBlock(editor: LexicalEditor, type: BlockType) {
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;
    const mapping: Record<BlockType, () => any> = {
      paragraph: () => null,
      h1: () => $createHeadingNode("h1"),
      h2: () => $createHeadingNode("h2"),
      quote: () => $createQuoteNode(),
    };
    const createNode = mapping[type];
    if (!createNode) return;
    $setBlocksType(selection, () => createNode());
  });
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-sm text-[var(--menu-text)] hover:border-[var(--menu-hover-bg)] hover:bg-[var(--menu-hover-bg)] hover:text-[var(--menu-hover-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<BlockType>("paragraph");
  const [fontLabel, setFontLabel] = useState<string>("无衬线（默认）");

  const promptForLink = useCallback(() => {
    const url = window.prompt("输入链接地址", "https://");
    if (url === null) return;
    if (url === "") {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  }, [editor]);

  const applyFontStyle = useCallback(
    (style: Record<string, string>, label?: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;
        $patchStyleText(selection, style);
      });
      if (label) setFontLabel(label);
    },
    [editor]
  );

  // Listen to selection changes to reflect current block type
  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        editor.getEditorState().read(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;
          const anchorNode = selection.anchor.getNode();
          const element =
            anchorNode.getKey() === "root"
              ? anchorNode
              : anchorNode.getTopLevelElementOrThrow();
          const type = element.getType();
          if (type === "paragraph") setBlockType("paragraph");
          else if (type === "heading") {
            // @ts-ignore internal
            const tag = element.getTag();
            if (tag === "h1") setBlockType("h1");
            else if (tag === "h2") setBlockType("h2");
          } else if (type === "quote") setBlockType("quote");
        });
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--dropdown-border)] bg-[var(--navbar-bg-color)] px-3 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <Dropdown
          trigger={
            <span className="inline-flex items-center gap-1 text-sm">
              {blockType === "paragraph"
                ? "段落"
                : blockType === "h1"
                ? "标题 1"
                : blockType === "h2"
                ? "标题 2"
                : blockType === "quote"
                ? "引用"
                : "块 / DOM"}
              <ChevronDown className="h-4 w-4 opacity-70" />
            </span>
          }
        >
          <DropdownItem onClick={() => applyBlock(editor, "paragraph")} prefix="¶">
            段落
          </DropdownItem>
          <DropdownItem onClick={() => applyBlock(editor, "h1")} prefix="H1">
            标题 1
          </DropdownItem>
          <DropdownItem onClick={() => applyBlock(editor, "h2")} prefix="H2">
            标题 2
          </DropdownItem>
          <DropdownItem onClick={() => applyBlock(editor, "quote")} prefix={<Quote className="h-4 w-4" />}>
            引用
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
            }
            prefix="•"
          >
            无序列表
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
            }
            prefix="1."
          >
            有序列表
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
            }
            prefix="☑"
          >
            任务列表
          </DropdownItem>
        </Dropdown>

        <Dropdown
          trigger={
            <span className="inline-flex items-center gap-1 text-sm leading-none">
              <Type className="h-4 w-4" />
              <ChevronDown className="h-4 w-4 opacity-70" />
            </span>
          }
        >
          <DropdownItem
            onClick={() =>
              applyFontStyle(
                { "font-family": "var(--font-sans, 'Noto Sans SC')" },
                "无衬线（默认）"
              )
            }
          >
            无衬线（默认）
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              applyFontStyle({ "font-family": "'Georgia', serif" }, "衬线 Serif")
            }
          >
            衬线 Serif
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              applyFontStyle(
                { "font-family": "'SFMono-Regular', Menlo, monospace" },
                "等宽 Mono"
              )
            }
          >
            等宽 Mono
          </DropdownItem>
          <DropdownItem
            onClick={() => applyFontStyle({ "font-size": "14px" }, "字号 14")}
          >
            字号 14
          </DropdownItem>
          <DropdownItem
            onClick={() => applyFontStyle({ "font-size": "16px" }, "字号 16")}
          >
            字号 16
          </DropdownItem>
          <DropdownItem
            onClick={() => applyFontStyle({ "font-size": "20px" }, "字号 20")}
          >
            字号 20
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              applyFontStyle({ "line-height": "1.6" }, "行距 1.6")
            }
          >
            行距 1.6
          </DropdownItem>
          <DropdownItem onClick={() => applyFontStyle({}, "无样式")}>
            清除字体样式
          </DropdownItem>
        </Dropdown>
      </div>

      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={Bold}
          label="加粗"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold" as any)
          }
        />
        <ToolbarButton
          icon={Italic}
          label="斜体"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic" as any)
          }
        />
        <ToolbarButton
          icon={Underline}
          label="下划线"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline" as any)
          }
        />
        <ToolbarButton
          icon={Strikethrough}
          label="删除线"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough" as any)
          }
        />
        <ToolbarButton
          icon={Code}
          label="行内代码"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code" as any)
          }
        />
        <ToolbarButton
          icon={Highlighter}
          label="高亮"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight" as any)
          }
        />
      </div>

      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={List}
          label="无序列表"
          onClick={() =>
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
          }
        />
        <ToolbarButton
          icon={ListOrdered}
          label="有序列表"
          onClick={() =>
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
          }
        />
        <ToolbarButton
          icon={ListTodo}
          label="任务列表"
          onClick={() =>
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
          }
        />
        <ToolbarButton
          icon={LinkIcon}
          label="插入链接"
          onClick={promptForLink}
        />
      </div>

      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={Undo}
          label="撤销"
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        />
        <ToolbarButton
          icon={Redo}
          label="重做"
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        />
        <ToolbarButton
          icon={FormatClearIcon}
          label="左对齐"
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        />
        <ToolbarButton
          icon={FormatCenterIcon}
          label="居中"
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
          }
        />
        <ToolbarButton
          icon={FormatRightIcon}
          label="右对齐"
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
          }
        />
      </div>
    </div>
  );
}

function FormatClearIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5h14" />
      <path d="M7 9h10" />
      <path d="M9 13h6" />
      <path d="M11 17h2" />
    </svg>
  );
}

function FormatCenterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M6 10h12" />
      <path d="M4 14h16" />
      <path d="M6 18h12" />
    </svg>
  );
}

function FormatRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M8 10h12" />
      <path d="M4 14h16" />
      <path d="M8 18h12" />
    </svg>
  );
}
