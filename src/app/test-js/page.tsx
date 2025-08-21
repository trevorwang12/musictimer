'use client';

import { useState } from 'react';

export default function TestJSPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Initial message');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>JavaScript Test Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Counter Test</h2>
        <p>Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ padding: '10px', marginRight: '10px', cursor: 'pointer' }}
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ padding: '10px', marginRight: '10px', cursor: 'pointer' }}
        >
          Decrement
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Input Test</h2>
        <p>Message: {message}</p>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: '5px', width: '200px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Alert Test</h2>
        <button 
          onClick={() => alert('Button clicked!')}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          Show Alert
        </button>
        <button 
          onClick={() => { /* Console test removed */ }}
          style={{ padding: '10px', marginLeft: '10px', cursor: 'pointer' }}
        >
          Console Log
        </button>
      </div>

      <div>
        <h2>Debug Info</h2>
        <p>Window object exists: {typeof window !== 'undefined' ? 'Yes' : 'No'}</p>
        <p>React hydrated: {typeof window !== 'undefined' && window.React ? 'Yes' : 'No'}</p>
        <p>Current time: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}