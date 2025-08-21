'use client';

import { useState, useEffect } from 'react';
import { useTimerStore } from '@/lib/store';

export function DurationPickerNoSSR() {
  const [mounted, setMounted] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const { setMinutes: setStoreMinutes } = useTimerStore();

  useEffect(() => {
    setMounted(true);
    // Manual store rehydration
    useTimerStore.persist.rehydrate();
    // Get the current value from store
    setMinutes(useTimerStore.getState().minutes);
  }, []);

  const handleClick = (newMinutes: number) => {
    // Button clicked
    setMinutes(newMinutes);
    setStoreMinutes(newMinutes);
  };

  const adjustTime = (delta: number) => {
    const newMinutes = Math.max(1, Math.min(1440, minutes + delta));
    // Adjust time
    setMinutes(newMinutes);
    setStoreMinutes(newMinutes);
  };

  if (!mounted) {
    return (
      <div style={{ 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        padding: '20px',
        textAlign: 'center'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: 'white'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>
          Custom Duration
        </h3>
        <p style={{ margin: '0', color: '#666' }}>Current: <strong>{minutes} minutes</strong></p>
      </div>

      {/* Adjust Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => adjustTime(-5)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          -5m
        </button>
        <button
          onClick={() => adjustTime(-1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          -1m
        </button>
        <button
          onClick={() => adjustTime(1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          +1m
        </button>
        <button
          onClick={() => adjustTime(5)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          +5m
        </button>
      </div>

      {/* Preset Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Quick Presets:</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[1, 5, 10, 15, 20, 25, 30, 45, 60].map((preset) => (
            <button
              key={preset}
              onClick={() => handleClick(preset)}
              style={{
                padding: '8px 16px',
                backgroundColor: minutes === preset ? '#007bff' : '#f8f9fa',
                color: minutes === preset ? 'white' : 'black',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {preset}m
            </button>
          ))}
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666'
      }}>
        <p>Test: Click any button and check browser console for logs</p>
      </div>
    </div>
  );
}

export default DurationPickerNoSSR;