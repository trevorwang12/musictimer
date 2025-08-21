# Static Assets Fix Guide

## 🔧 Problem Description

The deployed application is experiencing:
- 404 errors for `_next/static/` files
- MIME type errors (`text/plain` instead of proper types)
- Font loading failures
- JavaScript/CSS execution blocked

## ✅ Solutions

### Option 1: Use Cloud-Optimized Dockerfile

Use `Dockerfile.cloud` for better static asset handling:

```bash
# Build with cloud-optimized Dockerfile
docker build -f Dockerfile.cloud -t timer-with-music .
```

### Option 2: Platform-Specific Configuration

#### For Dokploy/Railway/Render:

**Environment Variables:**
```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

**Build Commands:**
```bash
# Build
npm run build:production

# Start
node server.js
```

#### For Nginx Reverse Proxy:

Add to your nginx configuration:

```nginx
# Proper MIME types for Next.js assets
location /_next/static/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
    
    # Ensure proper MIME types
    location ~* \.js$ {
        add_header Content-Type "application/javascript; charset=utf-8";
    }
    
    location ~* \.css$ {
        add_header Content-Type "text/css; charset=utf-8";
    }
    
    location ~* \.woff2?$ {
        add_header Content-Type "font/woff2";
    }
}

# Serve service worker with correct MIME type
location = /sw.js {
    add_header Content-Type "application/javascript; charset=utf-8";
    add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

### Option 3: Next.js Configuration Update

The `next.config.ts` has been updated with proper MIME type headers. Rebuild and redeploy:

```bash
npm run build:production
```

## 🐳 Docker Fixes

### Key Changes in Dockerfile.cloud:

1. **Proper file copying order**
2. **Package.json inclusion**
3. **Correct static asset placement**
4. **Node.js direct execution**

### Build Command:
```bash
docker build -f Dockerfile.cloud -t timer-with-music .
docker run -p 7000:3000 timer-with-music
```

## 🔍 Verification

After deploying, check these endpoints:

```bash
# Check main page loads
curl -I https://yourdomain.com/

# Check static assets have correct MIME types
curl -I https://yourdomain.com/_next/static/chunks/[hash].js
# Should return: Content-Type: application/javascript

curl -I https://yourdomain.com/_next/static/chunks/[hash].css  
# Should return: Content-Type: text/css

# Check service worker
curl -I https://yourdomain.com/sw.js
# Should return: Content-Type: application/javascript
```

## ⚡ Quick Fix for Current Deployment

If you can't redeploy immediately, add these response headers in your platform's configuration:

```
/_next/static/*.js → Content-Type: application/javascript
/_next/static/*.css → Content-Type: text/css  
/_next/static/media/*.woff2 → Content-Type: font/woff2
/sw.js → Content-Type: application/javascript
```

## 🎯 Platform-Specific Instructions

### Dokploy:
1. Use build command: `npm run build:production`
2. Set start command: `node server.js`
3. Add environment variables as listed above

### Railway:
1. Railway auto-detects the build
2. Ensure `Dockerfile.cloud` is present
3. Or set custom build/start commands

### Vercel:
```bash
vercel --prod
```
(Vercel handles static assets automatically)

## 📊 Testing

Run the verification script to test locally:

```bash
./scripts/verify.sh
```

This will test all endpoints and static asset serving.

## 🎵 Next Steps

1. Rebuild with updated configuration
2. Redeploy using `Dockerfile.cloud`
3. Verify static assets load correctly
4. Check browser console for errors

The fixes address the root cause of MIME type issues and ensure proper static asset serving in production.