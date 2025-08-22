#!/bin/bash

# Docker build test script
set -e

echo "🐳 Testing Docker build..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -f Dockerfile.cloud -t timerwithmusic:test .

echo "✅ Docker build completed successfully!"

# Optional: Test the container
echo "🧪 Testing container startup..."
CONTAINER_ID=$(docker run -d -p 3001:3000 timerwithmusic:test)

echo "⏳ Waiting for container to start..."
sleep 10

# Check if container is healthy
if docker ps | grep -q $CONTAINER_ID; then
    echo "✅ Container is running successfully!"
    
    # Test HTTP response
    if curl -f http://localhost:3001 > /dev/null 2>&1; then
        echo "✅ HTTP response test passed!"
    else
        echo "❌ HTTP response test failed"
    fi
else
    echo "❌ Container failed to start"
    docker logs $CONTAINER_ID
fi

# Cleanup
echo "🧹 Cleaning up..."
docker stop $CONTAINER_ID
docker rm $CONTAINER_ID

echo "🎉 Docker build test completed!"