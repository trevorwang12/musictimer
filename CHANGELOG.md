# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2025-01-21

### 🔧 Fixed
- **Dynamic Routes**: Fixed 404 errors for all timer URLs (e.g., `/timer/5-minutes-music`, `/timer/25-minutes-music`)
- **Next.js 15 Compatibility**: Updated async params handling to work with Next.js 15
- **Route Structure**: Changed from `[minutes]-minutes-music` to `[slug]` folder structure for better URL matching
- **Static Generation**: Fixed `generateStaticParams()` to properly generate routes for common durations
- **Tailwind CSS Warning**: Resolved empty utility class warning in Timer component

### 🚀 Enhanced
- **SEO Optimization**: All timer pages now have dynamic metadata generation
- **Performance**: Improved static site generation for faster page loads
- **Developer Experience**: Better error handling and debugging information

### 📁 Changed
- Renamed route folder from `src/app/timer/[minutes]-minutes-music/` to `src/app/timer/[slug]/`
- Updated parameter extraction logic to handle full slug format (e.g., "5-minutes-music")
- Modified `generateStaticParams` to return complete slug strings instead of just minutes

### 🐛 Known Issues
- Custom timer controls may be unresponsive on some browsers (hydration issue)
- Workaround: Refresh page or use preset durations

## [1.1.0] - Previous Version
- Initial implementation with basic timer functionality
- Pomodoro timer support
- PWA capabilities
- Background music integration

---

## Legend
- 🔧 Fixed - Bug fixes
- 🚀 Enhanced - New features or improvements
- 📁 Changed - Changes to existing functionality
- 🐛 Known Issues - Current limitations or bugs