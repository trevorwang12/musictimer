#!/bin/bash

# Timer with Music - Complete Verification Script
echo "🎵 Timer with Music - Complete Verification"
echo "=========================================="

# Test builds
echo "📦 Testing builds..."
echo "1. Development build:"
if npm run build > /dev/null 2>&1; then
    echo "   ✅ Development build (with Turbopack): OK"
else
    echo "   ❌ Development build: Failed"
fi

echo "2. Production build:"
if npm run build:production > /dev/null 2>&1; then
    echo "   ✅ Production build (standard): OK"
else
    echo "   ❌ Production build: Failed"
fi

# Test linting
echo "3. Code quality:"
if npm run lint > /dev/null 2>&1; then
    echo "   ✅ ESLint: No errors"
else
    echo "   ❌ ESLint: Has errors"
fi

# Test standalone server (background process)
echo ""
echo "🚀 Testing server startup..."
PORT=7001 npm start > /tmp/server.log 2>&1 &
SERVER_PID=$!
sleep 3

# Test endpoints
if curl -f http://localhost:7001 > /dev/null 2>&1; then
    echo "✅ Standalone server: Running on port 7001"
    
    # Test critical endpoints
    echo "🔍 Testing endpoints..."
    
    endpoints=(
        "/"
        "/timer/25-minutes-music"  
        "/pomodoro"
        "/timer/custom"
        "/help"
        "/manifest.webmanifest"
        "/sw.js"
        "/favicon.ico"
    )
    
    for endpoint in "${endpoints[@]}"; do
        if curl -f "http://localhost:7001$endpoint" > /dev/null 2>&1; then
            echo "   ✅ $endpoint: OK"
        else
            echo "   ❌ $endpoint: Failed"
        fi
    done
    
else
    echo "❌ Standalone server: Not responding"
fi

# Cleanup
kill $SERVER_PID 2>/dev/null || true

echo ""
echo "📁 Checking file structure..."

# Check critical files
critical_files=(
    "package.json"
    "next.config.ts"
    "Dockerfile"
    "Dockerfile.production"
    "docker-compose.yml"
    ".dockerignore"
    "src/app/page.tsx"
    "src/lib/store.ts"
    "src/lib/audio.ts"
    "public/audio/rain.mp3"
    "public/favicon.ico"
    ".next/standalone/server.js"
)

for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file: Exists"
    else
        echo "   ❌ $file: Missing"
    fi
done

echo ""
echo "🐳 Docker configuration check..."

if [ -f "Dockerfile" ] && [ -f "Dockerfile.production" ]; then
    echo "   ✅ Multiple Dockerfile options available"
fi

if [ -f "docker-compose.yml" ] && [ -f "docker-compose.dev.yml" ]; then
    echo "   ✅ Docker Compose configurations complete"
fi

if [ -x "scripts/deploy.sh" ] && [ -x "scripts/check.sh" ]; then
    echo "   ✅ Deployment scripts ready"
fi

echo ""
echo "📊 Build size analysis..."
if [ -d ".next/standalone" ]; then
    echo "   ✅ Standalone build: $(du -sh .next/standalone | cut -f1)"
fi

if [ -d ".next/static" ]; then
    echo "   ✅ Static assets: $(du -sh .next/static | cut -f1)"
fi

echo ""
echo "🎯 Verification Complete!"
echo "Ready for deployment on any platform."