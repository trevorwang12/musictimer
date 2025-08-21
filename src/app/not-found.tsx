import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Home, Search, Coffee, Settings, HelpCircle, Music } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found. Return to Timer with Music home page.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The timer page you are looking for could not be found.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The page may have been moved, deleted, or you might have entered the wrong URL.
          </p>
          
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="grid grid-cols-2 gap-2">
              <Link href="/timer/custom" className="block">
                <Button variant="outline" className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  Custom Timer
                </Button>
              </Link>
              
              <Link href="/pomodoro" className="block">
                <Button variant="outline" className="w-full">
                  <Coffee className="w-4 h-4 mr-2" />
                  Pomodoro
                </Button>
              </Link>
              
              <Link href="/help" className="block">
                <Button variant="outline" className="w-full">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help
                </Button>
              </Link>
              
              <Link href="/privacy" className="block">
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Privacy
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground mb-3">
              Popular timer durations:
            </p>
            <div className="grid grid-cols-4 gap-2">
              <Link href="/timer/5-minutes-music">
                <Button variant="ghost" size="sm" className="w-full">5 min</Button>
              </Link>
              <Link href="/timer/10-minutes-music">
                <Button variant="ghost" size="sm" className="w-full">10 min</Button>
              </Link>
              <Link href="/timer/25-minutes-music">
                <Button variant="ghost" size="sm" className="w-full">25 min</Button>
              </Link>
              <Link href="/timer/30-minutes-music">
                <Button variant="ghost" size="sm" className="w-full">30 min</Button>
              </Link>
            </div>
          </div>
          
          <div className="pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              <Music className="w-3 h-3 inline mr-1" />
              Free timer with background music for productivity
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}