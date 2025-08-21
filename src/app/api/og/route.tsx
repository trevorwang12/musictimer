import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const minutes = searchParams.get('m') || '25';
    const mode = searchParams.get('mode') || 'timer';
    
    const minutesNum = parseInt(minutes, 10);
    const isValidMinutes = minutesNum >= 1 && minutesNum <= 1440;
    
    if (!isValidMinutes) {
      return new Response('Invalid minutes parameter', { status: 400 });
    }

    // Format time display
    const formatTime = (totalMinutes: number) => {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      
      if (hours === 0) return `${mins}min`;
      if (mins === 0) return `${hours}h`;
      return `${hours}h ${mins}m`;
    };

    const timeDisplay = formatTime(minutesNum);
    const title = mode === 'pomodoro' 
      ? 'Pomodoro Timer with Music'
      : `${timeDisplay} Timer with Music`;
    
    const subtitle = mode === 'pomodoro'
      ? '25/5 Work/Break Cycles'
      : 'Free Online Countdown';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage: 'linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        >
          {/* Main Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '60px',
              margin: '40px',
              border: '4px solid #e2e8f0',
            }}
          >
            {/* Timer Circle */}
            <div
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '8px solid #3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
                backgroundColor: '#eff6ff',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#1e40af',
                  fontFamily: 'monospace',
                }}
              >
                {timeDisplay}
              </div>
              
              {/* Music Note Icon */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '20px',
                  fontSize: '32px',
                  color: '#10b981',
                }}
              >
                ♪
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                color: '#1f2937',
                textAlign: 'center',
                marginBottom: '16px',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '28px',
                color: '#6b7280',
                textAlign: 'center',
                marginBottom: '32px',
              }}
            >
              {subtitle}
            </p>

            {/* Features */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                fontSize: '20px',
                color: '#4b5563',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>♪</span>
                <span>Background Music</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#3b82f6' }}>⏰</span>
                <span>Countdown Timer</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#8b5cf6' }}>✨</span>
                <span>Free to Use</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              fontSize: '16px',
              color: '#9ca3af',
            }}
          >
            timerwithmusic.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

// Support both GET and POST methods
export { GET as POST };