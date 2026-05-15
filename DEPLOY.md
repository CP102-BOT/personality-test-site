# 乱序人格研究所 — 部署指南

## 📋 概述

本项目是一个 Next.js 16 应用，使用 Supabase 作为数据库，Tailwind CSS 4 作为样式方案。

- **框架**: Next.js 16 (App Router)
- **数据库**: Supabase (PostgreSQL)
- **样式**: Tailwind CSS 4
- **部署平台推荐**: Vercel

---

## 🚀 快速部署（Vercel）

### 1. Fork / Clone 项目

```bash
git clone https://github.com/your-username/personality-test-site.git
cd personality-test-site
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制环境变量模板并填入真实值：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，至少需要配置以下三项：

| 变量名 | 说明 | 获取方式 |
|--------|------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | Supabase Dashboard > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务角色密钥 | Supabase Dashboard > Settings > API > service_role key |
| `ADMIN_PASSWORD` | 后台管理密码 | 自定义强密码 |

### 4. Vercel 部署

**方式 A — Vercel CLI：**

```bash
npm i -g vercel
vercel login
vercel --prod \
  --env NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co \
  --env SUPABASE_SERVICE_ROLE_KEY=xxx \
  --env ADMIN_PASSWORD=your-strong-password
```

**方式 B — Vercel Dashboard：**

1. 在 [vercel.com](https://vercel.com) 导入 Git 仓库
2. 在项目设置 > Environment Variables 中添加上述三个变量
3. 部署即可

### 5. 验证部署

部署后访问以下页面确认：

- `https://your-domain.vercel.app/` — 首页正常运行
- `https://your-domain.vercel.app/admin` — 后台管理页（使用 ADMIN_PASSWORD 登录）

---

## 🛠 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量（编辑 .env.local）
cp .env.example .env.local

# 启动开发服务器
npm run dev
```

打开 http://localhost:3000

---

## 📦 构建 & 启动（生产模式）

```bash
# 构建
npm run build

# 启动
npm start
```

---

## 🗄 Supabase 数据库设置

### 所需表结构

项目依赖一个 `unlock_codes` 表用于存储和管理解锁码。

在 Supabase SQL Editor 中运行以下 SQL：

```sql
-- unlock_codes 表
CREATE TABLE IF NOT EXISTS unlock_codes (
  id BIGSERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_unlock_codes_code ON unlock_codes(code);
CREATE INDEX IF NOT EXISTS idx_unlock_codes_used ON unlock_codes(used);
```

### 数据库连接确认

部署后，可以通过后台管理页 `/admin` 生成解锁码来验证数据库是否连接成功。

---

## 🔧 生产环境检查清单

- [ ] **环境变量** — `ADMIN_PASSWORD` 设置为强密码，不使用默认值
- [ ] **Supabase** — 确认 `unlock_codes` 表已创建
- [ ] **收款码** — 将 `UnlockContent.tsx` 中的收款码占位替换为真实收款码图片
  - 搜索文件：`src/components/UnlockContent.tsx`
  - 搜索标记：`QR_PLACEHOLDER` 或 `请上传你的收款码图片`
  - 将占位区域替换为 `<img src="/path/to/qr-code.png" alt="收款码" />`
- [ ] **域名** — 配置自定义域名（可选，Vercel 默认提供 `.vercel.app` 域名）
- [ ] **SEO** — 更新 `layout.tsx` 中的 `title` 和 `description` 元数据
- [ ] **价格** — 确认首页和付款页的价格文案与营销策略一致
- [ ] **分享** — 测试完整报告页的分享文案复制功能
- [ ] **HTTPS** — Vercel 默认启用，其他平台需要自行配置

---

## 🌐 部署到其他平台

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
```

### 云服务器 (Linux)

```bash
# 安装 Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 克隆项目
git clone https://github.com/your-username/personality-test-site.git
cd personality-test-site

# 安装 & 构建
npm install
npm run build

# 配置环境变量
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=your-strong-password
EOF

# 使用 PM2 守护进程
npm install -g pm2
pm2 start npm --name "personality-test" -- start
pm2 save
pm2 startup
```

---

## 🔍 常见问题

### Q: 部署后解锁码验证失败？

1. 检查 Supabase 环境变量是否正确
2. 确认 `unlock_codes` 表已创建
3. 在 `/admin` 后台重新生成解锁码后测试

### Q: 样式不生效？

确认 Node.js 版本 >= 18，Tailwind CSS 4 需要较新版本。

### Q: 如何修改测试题目或人格数据？

编辑以下文件：
- 题目：`src/lib/questions.ts`
- 人格定义：`src/lib/personalities.ts`
- 计分逻辑：`src/lib/scorer.ts`

---

## 📝 项目文件结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 首页
│   ├── test/page.tsx       # 测试页
│   ├── result/page.tsx     # 结果页（免费基础版）
│   ├── unlock/page.tsx     # 解锁页（付款/输入解锁码）
│   ├── full-report/page.tsx # 完整报告页（付费解锁后）
│   ├── about/page.tsx      # 关于页
│   ├── admin/page.tsx      # 后台管理页
│   └── api/                # API 路由
│       ├── auth/route.ts
│       ├── verify-unlock/route.ts
│       └── generate-codes/route.ts
├── components/             # React 组件
│   ├── UnlockContent.tsx
│   ├── ResultContent.tsx
│   └── FullReportContent.tsx
└── lib/                    # 工具库
    ├── supabase.ts         # Supabase 客户端 & 环境变量
    ├── store.ts            # 本地状态管理
    ├── scorer.ts           # 计分逻辑
    ├── personalities.ts    # 24 种人格定义
    └── questions.ts        # 测试题目
```

---

## 📄 License

本项目为私有项目，仅供授权使用。
