import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Music, Volume2, Smartphone, Zap, Focus, Heart, CheckCircle } from "lucide-react";
import TimerWrapper from "@/components/timer-wrapper";
import DurationPickerWrapper from "@/components/duration-picker-wrapper";
import { Metadata } from "next";
import {
  generateFAQStructuredData,
  generateWebsiteStructuredData,
  generateSoftwareAppStructuredData,
  combineStructuredData,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Online Timer with Music – Free Countdown Timer (1-30 Minutes)",
  description: "Free online countdown timer with relaxing background music. Perfect for study, workout, meditation, or focus sessions. Choose from preset timers or set custom durations.",
  keywords: [
    "online timer",
    "timer with music",
    "countdown timer",
    "focus timer",
    "study timer",
    "pomodoro timer",
    "productivity timer",
    "background music timer",
    "meditation timer",
    "work timer",
  ].join(", "),
  authors: [{ name: "Timer with Music" }],
  creator: "Timer with Music",
  publisher: "Timer with Music",
  category: "Productivity",
  openGraph: {
    title: "Online Timer with Music – Free Countdown Timer",
    description: "Free online countdown timer with relaxing background music. Perfect for study, work, and focus sessions.",
    url: "https://timerwithmusic.com",
    siteName: "Timer with Music",
    images: [
      {
        url: "https://timerwithmusic.com/api/og?m=25",
        width: 1200,
        height: 630,
        alt: "Timer with Music - Free Online Countdown Timer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Timer with Music – Free Countdown Timer",
    description: "Free online countdown timer with relaxing background music",
    images: ["https://timerwithmusic.com/api/og?m=25"],
    creator: "@timerwithmusic",
  },
  alternates: {
    canonical: "https://timerwithmusic.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code", // Replace with actual verification code
  },
};

const PRESET_TIMERS = [
  { minutes: 1, description: "Quick focus" },
  { minutes: 2, description: "Short break" },
  { minutes: 5, description: "Micro session" },
  { minutes: 10, description: "Study sprint" },
  { minutes: 15, description: "Work block" },
  { minutes: 20, description: "Deep focus" },
  { minutes: 25, description: "Pomodoro" },
  { minutes: 30, description: "Extended focus" },
];

export default function Home() {
  // Generate structured data
  const websiteData = generateWebsiteStructuredData();
  
  const appData = generateSoftwareAppStructuredData({
    name: "Timer with Music",
    description: "Free online countdown timer with relaxing background music. Perfect for study, work, meditation, and focus sessions.",
    url: "https://timerwithmusic.com",
  });

  const faqData = generateFAQStructuredData([
    {
      question: "How to use the online timer with music?",
      answer: "Simply choose your desired duration from the presets above or create a custom timer. Click start and enjoy background music while the countdown runs.",
    },
    {
      question: "Can the music loop during countdown?",
      answer: "Yes! The background music will loop continuously during your timer session. You can adjust the volume or change the sound anytime.",
    },
    {
      question: "Does it work on mobile devices?",
      answer: "Absolutely! Our timer works on all devices - desktop, tablet, and mobile. You can also add it to your home screen for quick access.",
    },
  ]);

  const structuredData = combineStructuredData(websiteData, appData, faqData);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      
      <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Online Timer with Music
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Free Countdown Timer (1–30 Minutes)
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Perfect for study, workout, meditation, or focus sessions. Choose from preset timers 
            or set your custom duration with relaxing background music.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {PRESET_TIMERS.map((timer) => (
            <Link 
              key={timer.minutes} 
              href={`/timer/${timer.minutes}-minutes-music`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    {timer.minutes} min
                  </CardTitle>
                  <CardDescription>{timer.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Music className="h-4 w-4" />
                    <span>With music</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* What is Timer with Music */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">What is Timer with Music?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Timer with Music is a free online countdown timer that combines precise timing with relaxing 
              background sounds. Perfect for productivity, study sessions, meditation, workouts, and focus blocks. 
              Our timer helps you stay on track while creating a calming atmosphere with nature sounds and ambient music.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Precise Timing</h3>
                <p className="text-sm text-muted-foreground">Accurate countdown from 1 minute to 24 hours</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Background Music</h3>
                <p className="text-sm text-muted-foreground">Rain, ocean, café, and white noise sounds</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Works Everywhere</h3>
                <p className="text-sm text-muted-foreground">Desktop, mobile, tablet - no app needed</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Interactive Timer
          </h2>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Duration Picker */}
            <div className="order-2 lg:order-1">
              <DurationPickerWrapper />
            </div>

            {/* Timer */}
            <div className="order-1 lg:order-2 flex items-start justify-center">
              <TimerWrapper />
            </div>
          </div>
          <div className="text-center mt-6">
            <Link href="/timer/custom">
              <Button variant="outline" size="lg">
                <Volume2 className="h-5 w-5 mr-2" />
                Full Custom Timer Page
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-16 bg-muted/50 rounded-2xl p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Timer with Music Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Multiple Timer Options</h3>
                  <p className="text-sm text-muted-foreground">Preset timers, custom durations, and Pomodoro technique support</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">4 Background Sounds</h3>
                  <p className="text-sm text-muted-foreground">Rain, ocean waves, café ambiance, and white noise for focus</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Visual Progress</h3>
                  <p className="text-sm text-muted-foreground">Animated circular progress bar with time remaining display</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Browser Notifications</h3>
                  <p className="text-sm text-muted-foreground">Get notified when your timer completes, even in other tabs</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Keyboard Shortcuts</h3>
                  <p className="text-sm text-muted-foreground">Space to start/pause, Ctrl+R to reset for quick control</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Works Offline</h3>
                  <p className="text-sm text-muted-foreground">PWA support - install and use without internet connection</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How to Use Timer with Music</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold mb-1">Choose Your Timer</h3>
                    <p className="text-muted-foreground text-sm">Select from preset timers (1-30 minutes) or create a custom duration up to 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold mb-1">Select Background Music</h3>
                    <p className="text-muted-foreground text-sm">Choose from rain sounds, ocean waves, café ambiance, white noise, or silent mode</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold mb-1">Start Your Session</h3>
                    <p className="text-muted-foreground text-sm">Click start and focus on your task while the timer counts down with relaxing music</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold mb-1">Adjust Settings</h3>
                    <p className="text-muted-foreground text-sm">Control volume, pause/resume, or reset the timer anytime during your session</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">5</div>
                  <div>
                    <h3 className="font-semibold mb-1">Get Notified</h3>
                    <p className="text-muted-foreground text-sm">Receive browser notification and audio alert when your timer session completes</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">6</div>
                  <div>
                    <h3 className="font-semibold mb-1">Start Next Session</h3>
                    <p className="text-muted-foreground text-sm">Reset for another session or try the Pomodoro mode for structured work/break cycles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Timer with Music */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Timer with Music?</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Focus className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Enhanced Focus & Productivity</h3>
                    <p className="text-muted-foreground">Background music helps mask distracting noises and creates a focused work environment. Studies show that ambient sounds can improve concentration and cognitive performance during tasks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Heart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Stress Reduction</h3>
                    <p className="text-muted-foreground">Nature sounds like rain and ocean waves are proven to reduce stress and anxiety. Our timer combines time management with relaxation therapy for better mental well-being.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Better Time Management</h3>
                    <p className="text-muted-foreground">Visual countdown and audio cues help you stay aware of time without constantly checking the clock. Perfect for time-boxing tasks and maintaining work-life balance.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Perfect For</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-2xl mb-2">📚</div>
                    <div className="font-medium">Study Sessions</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-2xl mb-2">💼</div>
                    <div className="font-medium">Work Tasks</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-2xl mb-2">🧘</div>
                    <div className="font-medium">Meditation</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-2xl mb-2">🏃</div>
                    <div className="font-medium">Exercise</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-2xl mb-2">🍅</div>
                    <div className="font-medium">Pomodoro</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-2xl mb-2">☕</div>
                    <div className="font-medium">Breaks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Other Options</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link href="/pomodoro">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-center">Pomodoro Timer</CardTitle>
                  <CardDescription className="text-center">
                    25/5 work/break cycles with music
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Start Pomodoro
                  </Button>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/help">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-center">Help & Tips</CardTitle>
                  <CardDescription className="text-center">
                    Learn how to use the timer effectively
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    View Guide
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions About Timer with Music
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How to use the online timer with music?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simply choose your desired duration from the presets above or create a custom timer. 
                  Click start and enjoy background music while the countdown runs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can the music loop during countdown?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! The background music will loop continuously during your timer session. 
                  You can adjust the volume or change the sound anytime.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Does it work on mobile devices?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! Our timer works on all devices - desktop, tablet, and mobile. 
                  You can also add it to your home screen for quick access.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What background music options are available?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose from 4 carefully selected ambient sounds: Rain Sounds (gentle rainfall), Ocean Waves (calming sea sounds), 
                  Café Ambiance (coffee shop atmosphere), and White Noise (for deep focus). All sounds loop seamlessly.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I use this timer for Pomodoro technique?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We have a dedicated Pomodoro timer with customizable work/break intervals. The default is 25 minutes work 
                  followed by 5-minute breaks, with longer breaks after every 4 cycles.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is the timer accurate and reliable?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our timer is built with precision JavaScript timing and includes visual progress indicators. 
                  It works accurately in both active and background browser tabs, with notifications to alert you when time is up.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need to install any software?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No installation required! This is a Progressive Web App (PWA) that works in any modern browser. 
                  You can optionally add it to your home screen for quick access, but it works great directly in your browser.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <footer className="border-t bg-muted/50 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Timer with Music</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Free online countdown timer with relaxing background music. Perfect for productivity, study, and focus sessions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Popular Timers</h4>
              <div className="space-y-2 text-sm">
                <Link href="/timer/5-minutes-music" className="block text-muted-foreground hover:text-foreground">5 Minute Timer</Link>
                <Link href="/timer/10-minutes-music" className="block text-muted-foreground hover:text-foreground">10 Minute Timer</Link>
                <Link href="/timer/15-minutes-music" className="block text-muted-foreground hover:text-foreground">15 Minute Timer</Link>
                <Link href="/timer/25-minutes-music" className="block text-muted-foreground hover:text-foreground">25 Minute Timer</Link>
                <Link href="/timer/30-minutes-music" className="block text-muted-foreground hover:text-foreground">30 Minute Timer</Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Features</h4>
              <div className="space-y-2 text-sm">
                <Link href="/pomodoro" className="block text-muted-foreground hover:text-foreground">Pomodoro Timer</Link>
                <Link href="/timer/custom" className="block text-muted-foreground hover:text-foreground">Custom Timer</Link>
                <div className="text-muted-foreground">Background Music</div>
                <div className="text-muted-foreground">Mobile Friendly</div>
                <div className="text-muted-foreground">Works Offline</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <Link href="/help" className="block text-muted-foreground hover:text-foreground">Help & Tips</Link>
                <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">Privacy Policy</Link>
                <Link href="/terms" className="block text-muted-foreground hover:text-foreground">Terms of Service</Link>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Timer with Music. Free online countdown timer with background music for productivity and focus.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
