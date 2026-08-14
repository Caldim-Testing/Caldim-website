#!/bin/bash
set -e

echo "============================================="
echo "🚀 CALDIM WEBSITE DEPLOYMENT STARTING"
echo "============================================="

# 1. Target directory check
TARGET_DIR="/var/www/Expo-Page"
if [ -d "$TARGET_DIR" ]; then
    echo "📌 [1/5] Navigating to $TARGET_DIR..."
    cd "$TARGET_DIR"
else
    echo "⚠️ Target directory $TARGET_DIR does not exist. Operating in current directory: $(pwd)"
fi

# 2. Pull latest commit from main
echo "📌 [2/5] Pulling latest code from origin main..."
git remote set-url origin https://github.com/Caldim-Testing/Caldim-website.git 2>/dev/null || true
git fetch origin main
git reset --hard origin/main

# 3. Install npm dependencies
echo "📌 [3/5] Installing dependencies..."
npm install --prefer-offline --no-audit

# 4. Build Next.js application safely
echo "📌 [4/5] Building Next.js production build..."
npm run build || { echo "❌ Next.js build failed! Aborting service reload to keep existing version active."; exit 1; }

# 5. Reload/restart service safely
echo "📌 [5/5] Reloading service 'expo-page'..."
if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "expo-page"; then
        echo "✔ Reloading PM2 process 'expo-page'..."
        pm2 reload expo-page --update-env || pm2 restart expo-page
        pm2 save
    elif pm2 list | grep -q "caldim-website"; then
        echo "✔ Reloading PM2 process 'caldim-website'..."
        pm2 reload caldim-website --update-env || pm2 restart caldim-website
        pm2 save
    else
        echo "✔ PM2 process not found, starting via ecosystem.config.js..."
        pm2 start ecosystem.config.js --env production || pm2 restart all
        pm2 save
    fi
elif systemctl is-active --quiet expo-page 2>/dev/null; then
    echo "✔ Restarting systemd service 'expo-page'..."
    sudo systemctl restart expo-page || systemctl restart expo-page
else
    echo "⚠️ Neither PM2 nor systemd active service found. Checking active processes..."
    ps aux | grep node || true
fi

echo "============================================="
echo "✅ CALDIM WEBSITE DEPLOYMENT COMPLETE!"
echo "============================================="
