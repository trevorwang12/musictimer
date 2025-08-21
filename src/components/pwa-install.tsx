'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function PWAInstall() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          // Service Worker registered
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  // New version available
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('[PWA] Service Worker registration failed:', error);
        });
    }

    // Check if already installed
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInAppBrowser = (window.navigator as {standalone?: boolean}).standalone === true;
      setIsInstalled(isStandalone || isInAppBrowser);
    };

    checkIfInstalled();

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for install prompt (Android/Chrome)
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
      
      // Show install banner after a delay if not dismissed recently
      const lastDismissed = localStorage.getItem('pwa-install-dismissed');
      const now = Date.now();
      const dismissedTime = lastDismissed ? parseInt(lastDismissed, 10) : 0;
      const daysSinceDismissed = (now - dismissedTime) / (1000 * 60 * 60 * 24);
      
      if (daysSinceDismissed > 7) {
        setTimeout(() => setShowInstallBanner(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      // App installed
      setIsInstalled(true);
      setShowInstallBanner(false);
      setInstallPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choiceResult = await installPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          // User accepted install
        } else {
          // User dismissed install
        }
        
        setInstallPrompt(null);
        setShowInstallBanner(false);
      } catch (error) {
        console.error('[PWA] Install error:', error);
      }
    } else if (isIOS) {
      setShowIOSInstructions(true);
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show anything if already installed
  if (isInstalled) {
    return null;
  }

  // iOS installation instructions modal
  if (showIOSInstructions) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="max-w-sm mx-auto">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Install Timer with Music</h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</div>
                <div>Tap the <strong>Share</strong> button in Safari</div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">2</div>
                <div>Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong></div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</div>
                <div>Tap <strong>&quot;Add&quot;</strong> to install the app</div>
              </div>
            </div>
            
            <Button
              onClick={() => setShowIOSInstructions(false)}
              className="w-full mt-4"
              variant="outline"
            >
              Got it!
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Installation banner
  if (showInstallBanner || (installPrompt && !isInstalled)) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
        <Card className="border-primary/20 bg-background/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Download className="h-4 w-4 text-primary" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">
                  Install Timer with Music
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Add to your home screen for quick access and offline use!
                </p>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleInstall}
                    size="sm"
                    className="flex-1"
                  >
                    Install
                  </Button>
                  <Button
                    onClick={handleDismiss}
                    size="sm"
                    variant="ghost"
                    className="px-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

export default PWAInstall;