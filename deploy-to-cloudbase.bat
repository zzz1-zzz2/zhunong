@echo off
echo 🚀 开始部署到腾讯云CloudBase...

REM 1. 构建项目
echo 📦 构建项目...
call npm run build:cloudbase

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ 构建失败，请检查错误信息
    pause
    exit /b 1
)

REM 2. 检查CloudBase CLI
echo 📋 检查CloudBase CLI...
where cloudbase >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo 📥 安装CloudBase CLI...
    call npm install -g @cloudbase/cli
)

REM 3. 登录CloudBase
echo 🔐 登录CloudBase...
call cloudbase login

REM 4. 部署到CloudBase
echo ☁️ 部署到CloudBase...
call cloudbase framework deploy

echo ✅ 部署完成！
echo 📱 请访问CloudBase控制台获取访问链接
echo 🌐 国内用户现在可以直接访问你的项目了！
pause