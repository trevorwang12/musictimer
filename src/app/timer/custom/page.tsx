import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Timer from "@/components/timer";
import DurationPickerWrapper from "@/components/duration-picker-wrapper";

export const metadata: Metadata = {
  title: "Custom Timer with Music – Set Any Duration (1-1440 Minutes)",
  description: "Create a custom countdown timer with any duration from 1 to 1440 minutes. Perfect for unique work sessions, study periods, or focus blocks with relaxing background music.",
  keywords: "custom timer, flexible duration, countdown timer, focus timer, study timer, work timer, productivity",
  openGraph: {
    title: "Custom Timer with Music",
    description: "Set any duration from 1 to 1440 minutes with relaxing background music",
    type: 'website',
  },
};

export default function CustomTimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Custom Timer with Music
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Set Any Duration (1-1440 Minutes)
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Create your perfect focus session with a custom timer duration. 
            Choose any time from 1 minute to 24 hours with relaxing background music.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 mb-12">
          {/* Duration Picker */}
          <div>
            <DurationPickerWrapper />
          </div>

          {/* Timer */}
          <div className="flex items-start justify-center">
            <Timer />
          </div>
        </div>

        {/* How to Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            How to Use the Custom Timer
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Setting Your Duration</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Type hours and minutes directly in the input fields</li>
                <li>• Use the slider for quick adjustments</li>
                <li>• Click preset buttons for common durations</li>
                <li>• Use +/- buttons for fine-tuning</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Timer Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Visual progress ring shows remaining time</li>
                <li>• Choose from multiple background sounds</li>
                <li>• Adjust volume to your preference</li>
                <li>• Get browser notifications when complete</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Custom Duration Ideas */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Custom Duration Ideas
          </h2>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Study Sessions</h4>
              <p className="text-sm text-muted-foreground mb-2">45-90 minutes for deep learning</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-muted rounded text-xs">45m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">60m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">90m</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Work Blocks</h4>
              <p className="text-sm text-muted-foreground mb-2">Focused work periods</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-muted rounded text-xs">25m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">50m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">2h</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Breaks & Relaxation</h4>
              <p className="text-sm text-muted-foreground mb-2">Short rest periods</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-muted rounded text-xs">5m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">15m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">30m</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Exercise & Fitness</h4>
              <p className="text-sm text-muted-foreground mb-2">Workout timers</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-muted rounded text-xs">7m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">20m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">45m</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Meditation & Mindfulness</h4>
              <p className="text-sm text-muted-foreground mb-2">Peaceful sessions</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-muted rounded text-xs">3m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">10m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">20m</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Creative Work</h4>
              <p className="text-sm text-muted-foreground mb-2">Design and writing</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-muted rounded text-xs">30m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">90m</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">3h</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Custom Timer FAQ
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-2">What&apos;s the maximum timer duration?</h3>
              <p className="text-muted-foreground">
                You can set timers up to 24 hours (1440 minutes). This makes it perfect for 
                extended work sessions, study marathons, or even all-day focus blocks.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-2">Can I adjust the timer while it&apos;s running?</h3>
              <p className="text-muted-foreground">
                For accuracy, timer duration cannot be changed while running. You can pause, 
                reset, and set a new duration, or let the current timer complete.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-2">Does the custom timer work offline?</h3>
              <p className="text-muted-foreground">
                Yes! Once the page loads, the timer works offline. However, background music 
                requires an internet connection to load initially.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-2">Can I save custom durations?</h3>
              <p className="text-muted-foreground">
                Your last used duration is automatically saved. We&apos;re working on a feature 
                to save multiple custom presets for quick access.
              </p>
            </div>
          </div>
        </section>

        {/* Related Timers */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Popular Timer Durations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[5, 10, 15, 20, 25, 30, 45, 60, 90, 120].map((minutes) => (
              <Link 
                key={minutes}
                href={`/timer/${minutes}-minutes-music`}
                className="block p-4 border rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="font-medium">
                  {minutes >= 60 ? `${minutes / 60}h` : `${minutes}m`}
                </div>
                <div className="text-xs text-muted-foreground">
                  Quick start
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Link href="/help" className="hover:text-foreground">Help</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
          </div>
          <p>&copy; 2025 Timer with Music. Free online countdown timer.</p>
        </div>
      </footer>
    </div>
  );
}