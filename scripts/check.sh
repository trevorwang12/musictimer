#!/bin/bash

# Timer with Music - Health Check Script
echo "🎵 Timer with Music - Health Check"
echo "================================="

# Check if application is running
if curl -f http://localhost:7000 > /dev/null 2>&1; then
    echo "✅ Application is running at http://localhost:7000"
    
    # Check specific endpoints
    echo "🔍 Testing endpoints..."
    
    # Home page
    if curl -f http://localhost:7000/ > /dev/null 2>&1; then
        echo "✅ Home page: OK"
    else
        echo "❌ Home page: Failed"
    fi
    
    # Timer page
    if curl -f http://localhost:7000/timer/25-minutes-music > /dev/null 2>&1; then
        echo "✅ Timer page: OK"
    else
        echo "❌ Timer page: Failed"
    fi
    
    # Pomodoro page
    if curl -f http://localhost:7000/pomodoro > /dev/null 2>&1; then
        echo "✅ Pomodoro page: OK"
    else
        echo "❌ Pomodoro page: Failed"
    fi
    
    # Manifest
    if curl -f http://localhost:7000/manifest.webmanifest > /dev/null 2>&1; then
        echo "✅ PWA manifest: OK"
    else
        echo "❌ PWA manifest: Failed"
    fi
    
else
    echo "❌ Application is not responding at http://localhost:7000"
    echo "💡 Try running: ./scripts/deploy.sh start"
fi

echo ""
echo "🐳 Docker Status:"
docker-compose ps 2>/dev/null || echo "No services running"