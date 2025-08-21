'use client';

import dynamic from 'next/dynamic';

const TimerNoSSR = dynamic(
  () => import("@/components/timer"),
  { 
    ssr: false,
    loading: () => (
      <div style={{ 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        padding: '40px',
        textAlign: 'center',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        Loading timer...
      </div>
    )
  }
);

interface TimerWrapperProps {
  initialMinutes?: number;
  autoFocus?: boolean;
}

export default function TimerWrapper({ initialMinutes, autoFocus }: TimerWrapperProps) {
  return <TimerNoSSR initialMinutes={initialMinutes} autoFocus={autoFocus} />;
}