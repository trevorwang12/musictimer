import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowLeft } from "lucide-react";
import PomodoroTimer from "@/components/pomodoro-timer";
import PomodoroSettingsWrapper from "@/components/pomodoro-settings-wrapper";
import { AudioControls } from "@/components/audio-controls";

export const metadata: Metadata = {
  title: "Pomodoro Timer with Music – Free 25/5 Technique Timer",
  description: "Free Pomodoro timer with relaxing background music. Classic 25-minute work sessions with 5-minute breaks for maximum productivity.",
  keywords: "pomodoro timer, pomodoro technique, 25 minute timer, productivity timer, focus timer with music",
  openGraph: {
    title: "Pomodoro Timer with Music",
    description: "Free Pomodoro timer with 25/5 work/break cycles and relaxing background music",
    type: 'website',
  },
};

export default function PomodoroPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to All Timers
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Clock className="h-10 w-10 md:h-12 md:w-12 text-primary" />
            Pomodoro Timer with Music
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            25/5 Work/Break Cycles with Relaxing Music
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Boost your productivity with the proven Pomodoro Technique. Work for 25 minutes, 
            then take a 5-minute break, all with beautiful background music to keep you focused.
          </p>
        </div>

        {/* Interactive Pomodoro Timer */}
        <div className="max-w-6xl mx-auto mb-12 grid lg:grid-cols-2 gap-8">
          {/* Timer */}
          <div className="order-1">
            <PomodoroTimer />
          </div>

          {/* Settings */}
          <div className="order-2">
            <PomodoroSettingsWrapper />
          </div>
        </div>

        {/* Audio Controls */}
        <div className="max-w-2xl mx-auto mb-12">
          <AudioControls />
        </div>

        {/* How Pomodoro Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            How the Pomodoro Technique Works
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <ol className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary text-xl">1.</span>
                    <div>
                      <div className="font-medium text-foreground">Work Session (25 minutes)</div>
                      <div>Focus on a single task without any distractions. Background music helps maintain concentration.</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary text-xl">2.</span>
                    <div>
                      <div className="font-medium text-foreground">Short Break (5 minutes)</div>
                      <div>Take a brief break. Step away from your work, stretch, or do something relaxing.</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary text-xl">3.</span>
                    <div>
                      <div className="font-medium text-foreground">Repeat 4 Times</div>
                      <div>Complete four work sessions with short breaks in between.</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary text-xl">4.</span>
                    <div>
                      <div className="font-medium text-foreground">Long Break (15-30 minutes)</div>
                      <div>After 4 sessions, take a longer break to fully recharge before starting the next cycle.</div>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Benefits of Pomodoro with Music
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Better Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  25-minute focused sessions help maintain deep concentration without mental fatigue.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reduced Procrastination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Breaking work into manageable chunks makes starting tasks less overwhelming.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enhanced Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Regular breaks prevent burnout and maintain high performance throughout the day.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stress Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Relaxing background music and structured breaks help reduce work-related stress.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Better Time Awareness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track how long tasks actually take and improve your time estimation skills.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Improved Work-Life Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Regular breaks ensure you take care of yourself while staying productive.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Pomodoro Timer FAQ
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I customize the Pomodoro timer settings?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! While 25/5 minutes is the classic Pomodoro ratio, you can adjust work sessions (5-120 minutes), 
                  short breaks (1-30 minutes), and long breaks (5-60 minutes) to fit your needs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens if I get interrupted during a Pomodoro?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can pause the timer if needed. For optimal results, try to handle interruptions during breaks, 
                  or note them down to address after the current session ends.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How does background music help with Pomodoro?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Background music masks distracting noises, signals your brain to enter focus mode, 
                  and creates a consistent environment that helps maintain concentration throughout your work sessions.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How many Pomodoros should I do per day?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most people find 6-8 Pomodoros (3-4 hours of focused work) per day to be effective. 
                  Start with fewer sessions and gradually increase as you build the habit.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Other Timer Options */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Other Timer Options
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[10, 15, 20, 30].map((minutes) => (
              <Link 
                key={minutes}
                href={`/timer/${minutes}-minutes-music`}
                className="block"
              >
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{minutes} min</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Focus timer
                    </div>
                  </CardContent>
                </Card>
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