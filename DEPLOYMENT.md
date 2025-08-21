# Deployment Guide

This guide covers different deployment methods for Timer with Music.

## 🚀 Quick Deploy

### Option 1: Using Production Dockerfile
For cloud platforms (Dokploy, Railway, etc.):

```bash
# Use the production-optimized Dockerfile
docker build -f Dockerfile.production -t timer-with-music .
docker run -p 7000:3000 timer-with-music
```

### Option 2: Using Nixpacks/Buildpacks
Most cloud platforms auto-detect Node.js apps. Make sure they use:

```bash
npm run build:production  # Standard Next.js build without Turbopack
```

## 🔧 Configuration

### Environment Variables
Set these in your deployment platform:

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000  # Or your preferred port
```

### Build Commands
- **Build Command**: `npm run build:production`
- **Start Command**: `npm start`
- **Node Version**: 18.x or higher

## 🐳 Docker Deployments

### Development
```bash
docker-compose up -d
```

### Production with Nginx
```bash
docker-compose --profile production up -d
```

### Cloud Platforms
Use `Dockerfile.production` for:
- Dokploy
- Railway
- Render
- DigitalOcean App Platform
- AWS App Runner

## ⚠️ Common Issues

### 1. Turbopack Build Errors
**Error**: `FileSystemPath("").join("../../../../../app") leaves the filesystem root`

**Solution**: Use the production build command:
```bash
npm run build:production
```

### 2. Port Configuration
**Error**: `EADDRINUSE: address already in use`

**Solution**: Check your platform's port requirements:
```bash
# Most platforms use PORT environment variable
export PORT=3000
npm start
```

### 3. Memory Issues
**Error**: `JavaScript heap out of memory`

**Solution**: Increase Node.js memory limit:
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build:production
```

## 🎯 Platform-Specific Instructions

### Dokploy
1. Connect your GitHub repository
2. Use these settings:
   - **Build Command**: `npm run build:production`
   - **Start Command**: `npm start`
   - **Port**: 3000
   - **Dockerfile**: `Dockerfile.production` (optional)

### Railway
1. Connect GitHub repository
2. Railway auto-detects Node.js
3. Set environment variables:
   ```env
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   ```

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
1. Build Command: `npm run build:production`
2. Publish Directory: `.next`
3. Node Version: 18

## 📊 Performance Tips

1. **Use Production Dockerfile** for smaller images
2. **Enable Compression** (included in config)
3. **Optimize Images** with Next.js Image component
4. **Use CDN** for static assets

## 🔍 Troubleshooting

### Build Fails
1. Check Node.js version (18.x required)
2. Try `npm run build:production` instead of `npm run build`
3. Clear npm cache: `npm ci`

### Runtime Errors
1. Check environment variables
2. Verify port configuration
3. Review application logs

### Performance Issues
1. Enable Next.js analytics
2. Check Core Web Vitals
3. Optimize large dependencies

## 📝 Support

If you encounter issues:
1. Check this guide first
2. Review GitHub Issues
3. Ensure you're using the latest code from `main` branch

## 🎵 Generated with Claude Code