# Timer with Music 🎵

A modern, accessible online countdown timer with relaxing background music. Built with Next.js 15, TypeScript, Tailwind CSS, and designed for productivity and focus. Features dynamic routing, custom durations, and offline PWA capabilities.

## ✨ Features

### Core Functionality
- **Dynamic Timer Routes**: SEO-friendly URLs like `/timer/25-minutes-music`
- **Custom Duration Timer**: Set any duration from 1 minute to 24 hours
- **Preset Timers**: Quick access to common durations (1, 2, 5, 10, 15, 20, 25, 30 min)
- **Pomodoro Timer**: Full pomodoro technique support with customizable work/break intervals
- **Background Music**: Rain, ocean, café ambiance, and white noise with volume control
- **Visual Progress**: Animated progress ring with time display

### User Experience
- **Keyboard Shortcuts**: Space to start/pause, Ctrl+R to reset, Ctrl+N to skip (Pomodoro)
- **Browser Notifications**: Alerts when timer completes
- **Offline Support**: Works without internet connection (PWA)
- **Mobile Responsive**: Optimized for all device sizes
- **Accessibility**: Screen reader support, keyboard navigation, ARIA labels

### Technical Features
- **SEO Optimized**: Dynamic meta tags, structured data, Open Graph images
- **Progressive Web App**: Installable, offline-capable, app-like experience
- **Performance**: Core Web Vitals optimized, lazy loading, efficient caching
- **Type Safe**: Full TypeScript implementation

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm
- Docker (optional, for containerized deployment)

### Installation

#### Option 1: Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/timer-with-music.git
cd timer-with-music

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:7000](http://localhost:7000) to view the app in development mode.

#### Option 2: Docker Deployment

**Quick Start (Recommended)**

```bash
# Clone the repository
git clone https://github.com/your-username/timer-with-music.git
cd timer-with-music

# Option 1: Use deployment script (recommended)
./scripts/deploy.sh start

# Option 2: Direct Docker Compose
docker-compose up -d
```

The application will be available at [http://localhost:7000](http://localhost:7000)

**Deployment Script Commands:**

```bash
# Start services
./scripts/deploy.sh start          # Development mode
./scripts/deploy.sh start prod     # Production with Nginx

# Manage services
./scripts/deploy.sh stop           # Stop all services
./scripts/deploy.sh restart        # Restart services
./scripts/deploy.sh logs           # View logs
./scripts/deploy.sh status         # Check status
./scripts/deploy.sh clean          # Clean up resources
```

**Manual Docker Build**

```bash
# Build the Docker image
docker build -t timer-with-music .

# Run the container
docker run -d \
  --name timer-with-music \
  -p 7000:3000 \
  --restart unless-stopped \
  timer-with-music
```

**Production Deployment with Nginx**

For production with reverse proxy and SSL:

```bash
# Start with production profile (includes Nginx)
docker-compose --profile production up -d

# Or use the development compose file
docker-compose -f docker-compose.dev.yml up -d
```

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── timer/[slug]/      # Dynamic timer pages (e.g., /timer/5-minutes-music)
│   ├── timer/custom/      # Custom duration timer page
│   ├── pomodoro/          # Pomodoro timer page
│   ├── offline/           # Offline fallback page
│   ├── api/og/            # Dynamic OG image generation
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── timer.tsx         # Main timer component
│   ├── pomodoro-timer.tsx # Pomodoro functionality
│   ├── audio-controls.tsx # Audio management
│   └── pwa-install.tsx   # PWA installation prompt
├── hooks/                # Custom React hooks
│   └── useAudio.ts       # Audio management hook
├── lib/                  # Utilities and configurations
│   ├── store.ts          # Zustand state management
│   ├── audio.ts          # Web Audio API wrapper
│   └── structured-data.ts # SEO structured data
└── public/               # Static assets
    ├── audio/            # Background music files
    ├── sw.js            # Service worker
    └── icons/           # PWA icons
```

## 🎨 Customization

### Background Music System

The app uses a loop-based audio system that automatically repeats short audio files to match any timer duration (1 minute to 24 hours).

#### Current Audio Files

Located in `public/audio/`:
- `rain.mp3` - Gentle rainfall sounds
- `ocean-waves.mp3` - Calming ocean waves 
- `cafe-ambiance.mp3` - Coffee shop ambiance
- `white-noise.mp3` - White noise for focus

#### How Audio Looping Works

```javascript
// Audio files are set to loop automatically
audio.loop = true;

// Music plays continuously until timer ends
// 3-minute audio file can play for 2-hour timer
```

**Benefits:**
- ✅ **Any Duration**: Short audio files support timers of any length
- ✅ **Small File Size**: 3-10 minute files instead of hour-long tracks
- ✅ **Fast Loading**: Quick start with metadata preloading
- ✅ **Memory Efficient**: Single audio instance loops seamlessly

#### Adding New Background Sounds

**Step 1: Prepare Audio Files**

Recommended specifications:
```
Format: MP3
Bitrate: 128kbps (balance of quality/size)
Duration: 3-10 minutes (optimal for looping)
Content: Seamless loops (no obvious start/end)
```

Good audio types:
- 🌧️ **Nature sounds** (rain, forest, wind)
- ☕ **Ambient environments** (café, library, office)
- 🎵 **Lo-fi music** (gentle instrumental)
- 🔊 **Focus sounds** (brown noise, pink noise)

**Step 2: Add Files to Project**

```bash
# Add your audio files to the public directory
public/audio/forest.mp3
public/audio/piano.mp3
public/audio/brownoise.mp3
```

**Step 3: Update Configuration**

Edit `src/lib/audio.ts`:
```javascript
export const AUDIO_TRACKS: AudioTrack[] = [
  // Existing tracks...
  {
    id: 'rain',
    name: 'Rain Sounds',
    url: '/audio/rain.mp3',
  },
  // Add new tracks
  {
    id: 'forest',
    name: 'Forest Sounds',
    url: '/audio/forest.mp3',
  },
  {
    id: 'piano',
    name: 'Soft Piano',
    url: '/audio/piano.mp3',
  },
  {
    id: 'brownoise',
    name: 'Brown Noise',
    url: '/audio/brownoise.mp3',
  },
];
```

**Step 4: Update Type Definitions**

Edit `src/lib/store.ts`:
```javascript
export type SoundID = 
  | 'rain' 
  | 'ocean' 
  | 'cafe' 
  | 'white'
  | 'forest'    // Add new IDs
  | 'piano'
  | 'brownoise'
  | 'none';
```

**Step 5: Test Your Audio**

```bash
npm run dev
# Navigate to http://localhost:7000
# Your new sounds will appear in the audio controls
```

#### Audio System Features

**Automatic Management:**
- **Preloading**: Audio metadata loads on app start
- **Fade Effects**: Smooth fade in/out transitions
- **Volume Control**: User-adjustable volume (0-100%)
- **Pause/Resume**: Syncs with timer state
- **Memory Cleanup**: Automatic resource management

**Browser Compatibility:**
- **Autoplay Policy**: Handles browser restrictions
- **Error Handling**: Graceful fallback for failed loads  
- **Mobile Support**: Works on iOS and Android
- **Offline Ready**: Cached audio plays offline

#### File Size Guidelines

| Duration | File Size | Use Case |
|----------|-----------|----------|
| 1-2 min  | 1-2 MB   | Simple loops (rain, white noise) |
| 3-5 min  | 3-5 MB   | Environment sounds (café, forest) |
| 5-10 min | 5-10 MB  | Music tracks (lo-fi, ambient) |

**💡 Pro Tip**: Keep files under 10MB for fast loading. The loop system makes longer files unnecessary!

### Styling

The app uses Tailwind CSS with a custom design system. Key files:
- `src/app/globals.css` - Global styles and CSS custom properties
- `tailwind.config.js` - Tailwind configuration
- `src/components/ui/` - Reusable UI components

## 📊 Performance

The app is optimized for Core Web Vitals:
- **LCP**: < 2.5s through optimized images and critical CSS
- **CLS**: < 0.1 with stable layouts and proper sizing
- **INP**: < 200ms with efficient event handlers

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**: Proper contrast ratios, keyboard navigation
- **Screen Reader Support**: ARIA labels, live regions, semantic HTML
- **Keyboard Navigation**: Full functionality without mouse
- **Reduced Motion**: Respects user preferences for animations

## 🔧 Configuration

### Environment Variables

```env
# Production environment
NODE_ENV=production

# Enable headers for production builds
ENABLE_HEADERS=true

# Server port (default: 7000)
PORT=7000
```

### PWA Configuration

PWA settings can be modified in:
- `src/app/manifest.ts` - Web app manifest
- `public/sw.js` - Service worker configuration

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Android Chrome 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🚀 Deployment

### Docker (Recommended for Self-hosting)

**Quick Deployment:**

```bash
# Clone and start with Docker Compose
git clone https://github.com/your-username/timer-with-music.git
cd timer-with-music
docker-compose up -d
```

**Production Deployment:**

```bash
# Production deployment with Nginx reverse proxy
docker-compose --profile production up -d

# Custom configuration
docker-compose -f docker-compose.dev.yml up -d
```

**Container Management:**

```bash
# View logs
docker-compose logs -f timer-with-music

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

**Docker Features:**
- 🐳 **Multi-stage build** for optimized image size
- 🔒 **Non-root user** for security
- 🏥 **Health checks** built-in
- 📦 **Standalone mode** for efficient deployment
- 🔄 **Automatic restart** on failure

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Cloud Platforms

The app supports various deployment platforms:

**Container Platforms:**
- Docker Hub, AWS ECR, Google Container Registry
- Any platform supporting Docker containers

**Cloud Providers:**
- Vercel (recommended for Next.js)
- Netlify
- Render
- DigitalOcean App Platform
- Railway

**Self-hosted:**
- VPS with Docker support
- Kubernetes clusters
- Traditional web hosting with Node.js support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide React](https://lucide.dev/) for the icon set
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 🔄 Recent Updates

### v1.3.0 - Production Optimization & Docker Enhancement
- ✅ **Production Ready**: Optimized standalone builds with proper static file serving
- ✅ **Docker Improvements**: Multi-stage builds, security enhancements, health checks
- ✅ **Performance Optimizations**: Reduced bundle size, improved Core Web Vitals
- ✅ **HTTPS Security**: Enhanced security headers and CSP configuration
- ✅ **Audio System**: Improved reliability and browser compatibility
- ✅ **Pomodoro Timer**: Fixed settings save functionality and state management

### Previous Updates

#### v1.2.0 - Dynamic Routing & Next.js 15 Support
- ✅ **Fixed Dynamic Routes**: All timer URLs now work correctly (e.g., `/timer/5-minutes-music`)
- ✅ **Next.js 15 Compatibility**: Updated to support async params and latest features
- ✅ **SEO Improvements**: Dynamic metadata generation for all timer pages
- ✅ **Route Structure**: Changed from `[minutes]-minutes-music` to `[slug]` for better URL handling

## 🛠️ Troubleshooting

### Common Issues

**Build or Deployment Issues**
- Ensure Node.js 20+ is installed
- Run `npm run verify` to check deployment readiness
- Check Docker logs: `docker logs <container-name>`
- Verify environment variables are set correctly

**Timer or Audio Issues**
- Clear browser cache and localStorage
- Check browser console for JavaScript errors
- Ensure browser allows audio autoplay (user interaction required)
- Verify internet connection for audio streaming

**Performance Issues**
- Use production build: `npm run build && npm start`
- Enable hardware acceleration in browser
- Check for browser extensions that might interfere
- Monitor memory usage in browser dev tools

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/timer-with-music/issues) page
2. Create a new issue with detailed information
3. Include browser version, device type, and steps to reproduce

---

**Timer with Music** - Built with ❤️ for productivity and focus
