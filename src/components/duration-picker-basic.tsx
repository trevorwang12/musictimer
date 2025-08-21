'use client';

import { useState } from 'react';

export function DurationPickerBasic() {
  const [minutes, setMinutes] = useState(25);

  const handlePresetClick = (newMinutes: number) => {
    alert(`Setting ${newMinutes} minutes!`);
    setMinutes(newMinutes);
  };

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: '20px', 
      backgroundColor: 'white',
      margin: '10px'
    }}>
      <h3 style={{ margin: '0 0 20px 0' }}>
        Basic Duration Picker Test
      </h3>
      
      <div style={{ marginBottom: '20px' }}>
        <p>Current: <strong>{minutes} minutes</strong></p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>Quick Presets (HTML Buttons):</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => handlePresetClick(1)}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: minutes === 1 ? '#007bff' : '#f8f9fa',
              color: minutes === 1 ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            1m
          </button>
          <button 
            onClick={() => handlePresetClick(5)}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: minutes === 5 ? '#007bff' : '#f8f9fa',
              color: minutes === 5 ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            5m
          </button>
          <button 
            onClick={() => handlePresetClick(10)}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: minutes === 10 ? '#007bff' : '#f8f9fa',
              color: minutes === 10 ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            10m
          </button>
          <button 
            onClick={() => handlePresetClick(25)}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: minutes === 25 ? '#007bff' : '#f8f9fa',
              color: minutes === 25 ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            25m
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>Adjust Time:</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={() => {
              alert('Subtracting 5 minutes!');
              setMinutes(Math.max(1, minutes - 5));
            }}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            -5m
          </button>
          <button 
            onClick={() => {
              alert('Subtracting 1 minute!');
              setMinutes(Math.max(1, minutes - 1));
            }}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            -1m
          </button>
          <span style={{ margin: '0 20px', fontWeight: 'bold' }}>
            {minutes} min
          </span>
          <button 
            onClick={() => {
              alert('Adding 1 minute!');
              setMinutes(Math.min(1440, minutes + 1));
            }}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            +1m
          </button>
          <button 
            onClick={() => {
              alert('Adding 5 minutes!');
              setMinutes(Math.min(1440, minutes + 5));
            }}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            +5m
          </button>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666'
      }}>
        <p>Debug info:</p>
        <p>Current minutes: {minutes}</p>
        <p>Component loaded: Yes</p>
        <p>React state working: {minutes !== 25 ? 'Yes (changed from default)' : 'Default value'}</p>
      </div>
    </div>
  );
}

export default DurationPickerBasic;