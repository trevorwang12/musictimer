'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WifiOff, RefreshCw, Home, Clock } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
            <WifiOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">You&apos;re Offline</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Don&apos;t worry! Most timer features are still available offline. 
            Your timer will work, but you&apos;ll need an internet connection for background music.
          </p>

          {/* Available Offline Features */}
          <div className="text-left bg-muted/50 rounded-lg p-4 space-y-2">
            <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              Available Offline:
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ All timer functionality</li>
              <li>✓ Pomodoro technique</li>
              <li>✓ Custom time settings</li>
              <li>✓ Notifications</li>
              <li>✓ Keyboard shortcuts</li>
              <li>✓ Settings & preferences</li>
            </ul>
          </div>

          {/* Unavailable Features */}
          <div className="text-left bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 space-y-2 border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-medium text-sm mb-3 text-yellow-800 dark:text-yellow-200">
              Requires Internet:
            </h3>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Background music & sounds</li>
              <li>• New timer page loading</li>
              <li>• Settings synchronization</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            
            <div className="flex gap-2">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              
              <Link href="/timer/25-minutes-music" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  25min Timer
                </Button>
              </Link>
            </div>
          </div>

          {/* Tips */}
          <div className="text-xs text-muted-foreground border-t pt-4">
            <p className="mb-2">
              <strong>💡 Tip:</strong> Add this app to your home screen for easier offline access!
            </p>
            <p>
              Your timer settings and preferences are saved locally and will be available even when offline.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Background Pattern */}
      <div 
        className="fixed inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}