#!/bin/bash

# Timer with Music - Deployment Script
# This script helps deploy the application using Docker

set -e

echo "🎵 Timer with Music - Deployment Script"
echo "========================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Parse command line arguments
COMMAND=${1:-"help"}
PROFILE=${2:-"dev"}

case $COMMAND in
    "build")
        echo "📦 Building Docker image..."
        docker build -t timer-with-music .
        echo "✅ Build completed!"
        ;;
    
    "start")
        echo "🚀 Starting Timer with Music..."
        if [ "$PROFILE" = "prod" ]; then
            echo "🏭 Starting with production profile (includes Nginx)..."
            docker-compose --profile production up -d
        else
            echo "🔧 Starting in development mode..."
            docker-compose -f docker-compose.dev.yml up -d
        fi
        echo "✅ Application started!"
        echo "🌐 Access at: http://localhost:7000"
        ;;
    
    "stop")
        echo "⏹️  Stopping services..."
        docker-compose down
        docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
        echo "✅ Services stopped!"
        ;;
    
    "restart")
        echo "🔄 Restarting services..."
        $0 stop
        sleep 2
        $0 start $PROFILE
        ;;
    
    "logs")
        echo "📜 Showing application logs..."
        docker-compose logs -f timer-with-music || docker-compose -f docker-compose.dev.yml logs -f timer-with-music-dev
        ;;
    
    "status")
        echo "📊 Application Status:"
        echo "====================="
        docker-compose ps 2>/dev/null || echo "Main compose not running"
        docker-compose -f docker-compose.dev.yml ps 2>/dev/null || echo "Dev compose not running"
        ;;
    
    "clean")
        echo "🧹 Cleaning up Docker resources..."
        docker-compose down
        docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
        docker system prune -f
        echo "✅ Cleanup completed!"
        ;;
    
    "help")
        echo "Usage: $0 <command> [profile]"
        echo ""
        echo "Commands:"
        echo "  build          Build Docker image"
        echo "  start [prof]   Start services (dev|prod, default: dev)"
        echo "  stop           Stop all services"
        echo "  restart [prof] Restart services"
        echo "  logs           Show application logs"
        echo "  status         Show service status"
        echo "  clean          Clean up Docker resources"
        echo "  help           Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 start       # Start in development mode"
        echo "  $0 start prod  # Start with Nginx reverse proxy"
        echo "  $0 restart     # Restart in development mode"
        echo "  $0 logs        # View logs"
        ;;
    
    *)
        echo "❌ Unknown command: $COMMAND"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac