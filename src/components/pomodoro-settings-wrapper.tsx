'use client';

import dynamic from 'next/dynamic';

const PomodoroSettingsNoSSR = dynamic(
  () => import("@/components/pomodoro-settings-no-ssr"),
  { 
    ssr: false,
    loading: () => (
      <div style={{ 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        padding: '20px',
        textAlign: 'center'
      }}>
        Loading settings...
      </div>
    )
  }
);

export default function PomodoroSettingsWrapper() {
  return <PomodoroSettingsNoSSR />;
}