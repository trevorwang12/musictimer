'use client';

import { useEffect } from 'react';

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface EventTiming extends PerformanceEntry {
  processingStart: number;
  duration: number;
}

interface LargestContentfulPaint extends PerformanceEntry {
  renderTime: number;
  loadTime: number;
}

// Performance monitoring for Core Web Vitals
export function PerformanceMonitor() {
  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;
    
    // Disable performance monitoring to improve performance
    return;

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      let clsValue = 0;
      const clsEntries: LayoutShift[] = [];

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as LayoutShift[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        }
        
        // Log CLS if it exceeds threshold
        if (clsValue > 0.1) {
          console.warn('[Performance] High CLS detected:', clsValue);
        }
      });

      observer.observe({ type: 'layout-shift', buffered: true });
      return observer;
    };

    // First Input Delay (FID) / Interaction to Next Paint (INP)
    const observeINP = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as EventTiming[]) {
          const inp = entry.processingStart - entry.startTime;
          
          if (inp > 200) {
            console.warn('[Performance] High INP detected:', inp);
          }
        }
      });

      observer.observe({ type: 'event', buffered: true });
      return observer;
    };

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as LargestContentfulPaint[];
        const lastEntry = entries[entries.length - 1];
        
        if (lastEntry && lastEntry.startTime > 2500) {
          console.warn('[Performance] High LCP detected:', lastEntry.startTime);
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      return observer;
    };

    // Memory usage monitoring
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as Performance & {memory: {usedJSHeapSize: number; jsHeapSizeLimit: number}}).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
        
        if (usedMB > 50) {
          console.warn('[Performance] High memory usage:', `${usedMB}MB / ${limitMB}MB`);
        }
      }
    };

    // Long task monitoring
    const observeLongTasks = () => {
      if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('[Performance] Long task detected:', entry.duration + 'ms');
            }
          }
        });

        observer.observe({ type: 'longtask', buffered: true });
        return observer;
      }
    };

    // Initialize observers
    const observers = [
      observeCLS(),
      observeINP(),
      observeLCP(),
      observeLongTasks(),
    ].filter(Boolean);

    // Monitor memory periodically
    const memoryInterval = setInterval(monitorMemory, 30000);

    // Cleanup
    return () => {
      observers.forEach(observer => observer?.disconnect());
      clearInterval(memoryInterval);
    };
  }, []);

  return null;
}

// Web Vitals reporting function
export const reportWebVitals = (metric: {name: string; value: number; id: string}) => {
  // In production, you would send this data to your analytics service
  if (process.env.NODE_ENV === 'production') {
    console.log('[Web Vitals]', metric);
    
    // Example: Send to analytics
    // gtag('event', metric.name, {
    //   value: Math.round(metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // });
  }
};

export default PerformanceMonitor;