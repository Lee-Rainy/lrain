# =========================
# 1️⃣ Build 阶段
# =========================
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 启用 corepack（pnpm 必须）
RUN corepack enable

# 只复制依赖描述文件（用于缓存）
COPY package.json pnpm-lock.yaml ./

# 安装依赖（严格锁版本）
RUN pnpm install --frozen-lockfile

# 复制全部源码
COPY . .

# 构建 Next.js
RUN pnpm build


# =========================
# 2️⃣ Runtime 阶段
# =========================
FROM node:20-alpine AS runner

WORKDIR /app

# 设置生产环境
ENV NODE_ENV=production

# 启用 corepack
RUN corepack enable

# 只复制运行所需文件（减小镜像体积）
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules ./node_modules

# Next 默认端口
EXPOSE 3000

# 启动
CMD ["pnpm", "start"]
