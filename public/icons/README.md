# PWA Icons

This directory should contain the icon files for the Progressive Web App (PWA) functionality.

## Required Icons

### Standard Icons
- `icon-96.png` - 96x96 pixels (for shortcuts and small displays)
- `icon-192.png` - 192x192 pixels (standard app icon)
- `icon-512.png` - 512x512 pixels (high-res app icon)

### Maskable Icons
- `icon-192-maskable.png` - 192x192 pixels (maskable version for adaptive icons)
- `icon-512-maskable.png` - 512x512 pixels (maskable version for adaptive icons)

### Screenshots
- `screenshot-wide.png` - 1280x720 pixels (desktop/tablet screenshot)
- `screenshot-narrow.png` - 390x844 pixels (mobile screenshot)

## Icon Design Guidelines

### Standard Icons
- Use the timer logo/symbol as the main element
- Include subtle music notes or wave elements
- Use the brand colors: primary blue (#3b82f6) and white/light backgrounds
- Ensure good contrast and visibility at small sizes
- Keep design simple and recognizable

### Maskable Icons
- Design must fit within a safe zone (80% of the icon size)
- The outer 20% may be cropped by the system
- Use a solid background color
- Center the logo in the safe zone
- Test with various mask shapes (circle, rounded square, etc.)

### Screenshots
- Wide screenshot: Show desktop interface with timer and settings
- Narrow screenshot: Show mobile interface with timer active
- Include realistic timer values (like 25:00 or 05:43)
- Show the app in use with audio controls visible
- Use high-quality, clean interface captures

## Color Scheme
- Primary: #3b82f6 (blue)
- Secondary: #10b981 (green for music elements)
- Background: #ffffff (light) / #1f2937 (dark)
- Text: #374151 (light) / #f9fafb (dark)

## Tools for Creation
- **Figma/Sketch**: For vector design
- **Adobe Illustrator**: For scalable icons
- **PWA Asset Generator**: For automated icon generation
- **Real Favicon Generator**: For comprehensive icon sets

## Validation
- Test icons on various devices (Android, iOS)
- Check maskable icons with different mask shapes
- Validate with Lighthouse PWA audit
- Test installation flow on multiple browsers

## File Placement
Move all generated icons to the `/public/` directory root:
- `/public/icon-96.png`
- `/public/icon-192.png`
- `/public/icon-512.png`
- `/public/icon-192-maskable.png`
- `/public/icon-512-maskable.png`
- `/public/screenshot-wide.png`
- `/public/screenshot-narrow.png`