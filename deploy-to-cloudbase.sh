#!/bin/bash

# 神农溯源平台CloudBase部署脚本

echo "🚀 开始部署到腾讯云CloudBase..."

# 1. 构建项目
echo "📦 构建项目..."
npm run build:cloudbase

# 2. 检查构建结果
if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

# 3. 安装CloudBase CLI（如果未安装）
echo "📋 检查CloudBase CLI..."
if ! command -v cloudbase &> /dev/null; then
    echo "📥 安装CloudBase CLI..."
    npm install -g @cloudbase/cli
fi

# 4. 登录CloudBase
echo "🔐 登录CloudBase..."
cloudbase login

# 5. 部署到CloudBase
echo "☁️ 部署到CloudBase..."
cloudbase framework deploy

echo "✅ 部署完成！"
echo "📱 请访问CloudBase控制台获取访问链接"