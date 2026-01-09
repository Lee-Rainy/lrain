/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],

  // rules：控制提交规范校验
  rules: {
    // type 必须是以下之一
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复
        "docs", // 文档
        "style", // 格式（不影响代码）
        "refactor", // 重构
        "perf", // 性能优化
        "test", // 测试
        "build", // 构建
        "ci", // CI 配置
        "chore", // 杂项
        "revert", // 回滚
      ],
    ],
    "subject-empty": [2, "never"],
    "type-case": [2, "always", "lower-case"],
  },

  // prompt：cz-git 的交互配置
  prompt: {
    messages: {
      type: "请选择提交类型:",
      scope: "请输入影响范围（可选）:",
      subject: "请简要描述提交内容:",
      body: "请输入详细描述（可选）:",
      footerPrefixesSelect: "请选择关联 issue 前缀:",
      customFooterPrefix: "请输入自定义前缀:",
      footer: "请输入关联 issue (可选):",
      confirmCommit: "确认提交吗？",
    },

    types: [
      { value: "feat", name: "feat: ✨ 新功能" },
      { value: "fix", name: "fix: 🐛 修复问题" },
      { value: "docs", name: "docs: 📚 文档更新" },
      { value: "style", name: "style: 💄 样式调整" },
      { value: "refactor", name: "refactor: ♻️ 重构" },
      { value: "perf", name: "perf: ⚡ 性能优化" },
      { value: "test", name: "test: 🧪 测试" },
      { value: "build", name: "build: 🏗 构建相关" },
      { value: "ci", name: "ci: 🤖 CI 配置" },
      { value: "chore", name: "chore: 🔧 其他修改" },
      { value: "revert", name: "revert: ⏪ 回滚提交" },
    ],

    allowCustomScopes: true,
    allowEmptyScopes: true,
    allowBreakingChanges: ["feat", "fix"],
    skipQuestions: ["body"],

    subjectLimit: 100,
  },
};
