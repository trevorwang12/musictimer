'use client';

import dynamic from 'next/dynamic';

const DurationPickerNoSSR = dynamic(
  () => import("@/components/duration-picker-no-ssr"),
  { 
    ssr: false,
    loading: () => (
      <div style={{ 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        padding: '20px',
        textAlign: 'center'
      }}>
        Loading duration picker...
      </div>
    )
  }
);

export default function DurationPickerWrapper() {
  return <DurationPickerNoSSR />;
}