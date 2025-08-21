# 🎵 Audio Files Directory

This directory contains background music files for the Timer with Music application. The audio system uses **loop-based playback** to support timers of any duration (1 minute to 24 hours).

## 📁 Current Audio Files

- `rain.mp3` - Gentle rainfall sounds (3.2 MB, 3:45)
- `ocean.mp3` - Calming ocean waves (4.1 MB, 4:12)  
- `cafe.mp3` - Coffee shop ambiance (5.8 MB, 5:30)
- `white.mp3` - White noise for focus (2.9 MB, 3:00)

## 🔄 How the Loop System Works

```javascript
// Each audio file automatically loops until timer ends
audio.loop = true;

// Example: 5-minute audio file can play for 2-hour timer
// Audio repeats: 5min → 5min → 5min → ... (24 cycles)
```

**Key Benefits:**
- ✅ **Universal Duration Support**: 3-minute file works for 3-hour timer
- ✅ **Small File Sizes**: No need for hour-long audio tracks
- ✅ **Fast Loading**: Quick startup with efficient streaming
- ✅ **Memory Efficient**: Single audio instance, seamless loops

## 🎯 Audio Specifications

### Recommended Format
```
Format: MP3 (best browser compatibility)
Bitrate: 128kbps (quality/size balance)
Duration: 3-10 minutes (optimal for looping)
Sample Rate: 44.1kHz (CD quality)
Channels: Stereo
```

### File Size Guidelines
| Duration | Target Size | Use Case |
|----------|-------------|----------|
| 1-3 min  | 1-3 MB     | Simple ambiance (rain, white noise) |
| 3-5 min  | 3-5 MB     | Environmental sounds (café, forest) |
| 5-10 min | 5-10 MB    | Musical content (lo-fi, instrumental) |
| 10+ min  | Not recommended | Unnecessary with loop system |

## 🛠️ Audio Preparation Guide

### 1. Creating Seamless Loops

**Essential for good user experience:**
```bash
# Use audio editing software (Audacity, Adobe Audition, GarageBand)
1. Trim to exact loop point (no silence gaps)
2. Apply crossfade between end/start (0.1-0.5 seconds)
3. Test loop in audio editor before export
4. Listen for "clicks" or "pops" at loop boundary
```

### 2. Audio Processing Checklist

- [ ] **Normalize Volume**: -3dB to -6dB peak (prevents clipping)
- [ ] **Remove DC Offset**: Center waveform around zero
- [ ] **Apply Soft Limiter**: Prevent unexpected volume spikes  
- [ ] **EQ Adjustment**: Gentle high-frequency roll-off for relaxation
- [ ] **Fade Edges**: 50ms fade-in/out to prevent clicks
- [ ] **Mono Compatibility**: Test stereo content in mono

### 3. Content Guidelines

**✅ Good Audio Types:**
- 🌧️ **Nature Sounds**: Rain, ocean, forest, wind, birds
- ☕ **Ambient Environments**: Café, library, fireplace, office
- 🎵 **Lo-fi Music**: Gentle instrumental, ambient, minimalist
- 🔊 **Focus Sounds**: White noise, brown noise, pink noise
- 🎹 **Soft Instruments**: Piano, guitar, strings (no percussion)

**❌ Avoid:**
- Sudden volume changes or loud peaks
- Recognizable melodies or songs (too distracting)  
- Speech or vocals
- Sharp transients or percussive elements
- Obvious loop points or repetitive patterns

## 🌐 Royalty-Free Audio Sources

### Free Resources
- **[Freesound.org](https://freesound.org/)** - Creative Commons licensed
- **[YouTube Audio Library](https://www.youtube.com/audiolibrary)** - Free for any use
- **[BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/)** - Public domain
- **[Adobe Audition](https://audition.adobe.com/)** - Built-in royalty-free loops

### Premium Sources
- **[Epidemic Sound](https://www.epidemicsound.com/)** - Subscription-based
- **[AudioJungle](https://audiojungle.net/)** - Individual purchases
- **[Artlist](https://artlist.io/)** - High-quality ambient tracks

### DIY Recording
- Record nature sounds with smartphone/microphone
- Use virtual instruments (GarageBand, FL Studio)
- Layer multiple ambient sounds
- **Pro Tip**: 10-minute nature recordings make excellent loops!

## 🧪 Testing Your Audio

### Local Testing
```bash
# 1. Add file to public/audio/
cp your-audio.mp3 public/audio/forest.mp3

# 2. Update configuration (see main README.md)
# Edit src/lib/audio.ts and src/lib/store.ts

# 3. Test in development
npm run dev
# Navigate to localhost:7001 and test audio controls
```

### Quality Checklist
- [ ] Loads quickly (< 3 seconds on slow connection)
- [ ] Loops seamlessly (no gaps or clicks)
- [ ] Volume consistent with other tracks
- [ ] Works on mobile devices (iOS/Android)
- [ ] Comfortable for 30+ minute listening
- [ ] No audio dropouts or glitches

## 🔧 Technical Implementation

### Audio Manager Integration
```javascript
// Files are automatically detected by audio manager
// Located at: src/lib/audio.ts

const track = {
  id: 'your-sound-id',
  name: 'Your Sound Name', 
  url: '/audio/your-audio.mp3',
  audio: HTMLAudioElement  // Created automatically
};

// Features:
- Preloading with metadata
- Automatic loop configuration  
- Fade in/out transitions
- Volume normalization
- Error handling
```

### Browser Compatibility
- **Autoplay Policy**: Handled automatically with user interaction
- **Format Support**: MP3 universally supported
- **Mobile Optimization**: iOS/Android audio context management  
- **Offline Caching**: Service worker caches audio files
- **Error Recovery**: Graceful fallback for loading failures

## 📞 Support

**Audio Issues?**
1. Check browser console for loading errors
2. Verify file size < 10MB 
3. Ensure MP3 format compatibility
4. Test audio loop boundary in audio editor
5. Check file permissions and URL accessibility

**Need Help Adding Audio?**
See the main project README.md for step-by-step integration guide.

---

**Remember**: The loop system makes shorter, high-quality files more effective than long tracks. Focus on creating perfect 3-10 minute experiences! 🎵