'use client';

import dynamic from 'next/dynamic';

const AudioControlsNoSSR = dynamic(
  () => import("@/components/audio-controls").then(mod => ({ default: mod.AudioControls })),
  { 
    ssr: false,
    loading: () => (
      <div style={{ 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        padding: '20px',
        textAlign: 'center'
      }}>
        Loading audio controls...
      </div>
    )
  }
);

export default function AudioControlsWrapper() {
  return <AudioControlsNoSSR />;
}