import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, ArrowLeft, Zap } from "lucide-react";
import TimerWrapper from "@/components/timer-wrapper";
import DurationPickerWrapper from "@/components/duration-picker-wrapper";
import {
  generateFAQStructuredData,
  generateSoftwareAppStructuredData,
  generateHowToStructuredData,
  combineStructuredData,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "HIIT Timer with Music – High Intensity Interval Training",
  description: "Free HIIT timer with energizing music. Perfect for high-intensity interval training workouts with customizable work/rest intervals.",
  keywords: [
    "HIIT timer",
    "interval timer",
    "workout timer",
    "fitness timer",
    "high intensity training",
    "exercise timer",
    "training timer with music",
    "interval training",
  ].join(", "),
  authors: [{ name: "Timer with Music" }],
  creator: "Timer with Music",
  publisher: "Timer with Music",
  category: "Fitness",
  openGraph: {
    title: "HIIT Timer with Music – High Intensity Interval Training",
    description: "Free HIIT timer with energizing music for high-intensity interval training workouts.",
    url: "https://timerwithmusics.com/hiit",
    siteName: "Timer with Music",
    images: [
      {
        url: "https://timerwithmusics.com/api/og?hiit=true",
        width: 1200,
        height: 630,
        alt: "HIIT Timer with Music",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HIIT Timer with Music",
    description: "Free HIIT timer with energizing music for interval training",
    images: ["https://timerwithmusics.com/api/og?hiit=true"],
    creator: "@timerwithmusic",
  },
  alternates: {
    canonical: "https://timerwithmusics.com/hiit",
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
};

export default function HIITTimerPage() {
  const baseUrl = 'https://timerwithmusics.com';
  const pageUrl = `${baseUrl}/hiit`;

  // Generate structured data
  const faqData = generateFAQStructuredData([
    {
      question: "What is a HIIT timer?",
      answer: "HIIT (High-Intensity Interval Training) timer alternates between intense exercise periods and rest/recovery periods. Typically 30 seconds work, 15 seconds rest for optimal fat burning and cardiovascular benefits.",
    },
    {
      question: "How do I use this HIIT timer with music?",
      answer: "Set your desired work and rest intervals, choose energizing background music, and start your workout. The timer will automatically alternate between work and rest periods with audio cues.",
    },
    {
      question: "What's the best HIIT interval ratio?",
      answer: "Popular ratios include 2:1 (30s work, 15s rest), 1:1 (30s work, 30s rest), or 3:1 (45s work, 15s rest). Start with 2:1 for beginners and adjust based on your fitness level.",
    },
  ]);

  const appData = generateSoftwareAppStructuredData({
    name: "HIIT Timer with Music",
    description: "Free HIIT timer with energizing background music. Perfect for high-intensity interval training workouts with customizable intervals.",
    url: pageUrl,
    minutes: 30, // Default HIIT session length
  });

  const howToData = generateHowToStructuredData(30, "HIIT");

  const structuredData = combineStructuredData(faqData, appData, howToData);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      
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
              <Zap className="h-10 w-10 md:h-12 md:w-12 text-primary" />
              HIIT Timer with Music
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              High Intensity Interval Training
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Perfect for high-intensity workouts, fat burning, and cardiovascular training. 
              Customize your work/rest intervals and enjoy energizing background music to keep you motivated.
            </p>
          </div>

          {/* Interactive HIIT Timer with Custom Duration */}
          <div className="mb-12">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
              {/* Duration Picker */}
              <div className="order-2 lg:order-1">
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl mb-2">HIIT Intervals</CardTitle>
                    <CardDescription>
                      Set your work and rest periods for high-intensity interval training
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <DurationPickerWrapper />
                    
                    {/* HIIT Presets */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Popular HIIT Intervals</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <Button variant="outline" size="sm" className="justify-start">
                          30s Work / 15s Rest
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start">
                          45s Work / 15s Rest
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start">
                          20s Work / 10s Rest
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start">
                          40s Work / 20s Rest
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timer */}
              <div className="order-1 lg:order-2 flex items-start justify-center">
                <TimerWrapper />
              </div>
            </div>
          </div>

          {/* HIIT Instructions */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              How to Use Your HIIT Timer
            </h2>
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary">1.</span>
                      <span>Use the duration picker to set your custom interval time or select a HIIT preset</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary">2.</span>
                      <span>Popular ratios: 30s work/15s rest (2:1), 20s work/10s rest, or 45s work/15s rest (3:1)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary">3.</span>
                      <span>Choose energizing background music to keep you motivated during intense intervals</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary">4.</span>
                      <span>Start the timer and alternate between high-intensity work periods and active recovery</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary">5.</span>
                      <span>Repeat the work/rest cycle 4-8 times for a complete 15-30 minute HIIT session</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* HIIT Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Benefits of HIIT Training
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Fat Burning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    HIIT burns more calories in less time and continues burning calories 
                    after your workout through the "afterburn effect" (EPOC).
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Time Efficient
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get maximum results in minimum time. A 15-20 minute HIIT session 
                    can be more effective than an hour of steady-state cardio.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">❤️ Cardiovascular Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Improves heart health, increases VO2 max, and enhances overall 
                    cardiovascular endurance more effectively than traditional cardio.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💪 Muscle Preservation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Unlike long cardio sessions, HIIT helps preserve muscle mass while 
                    burning fat, giving you a toned and strong physique.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ specific to HIIT */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              HIIT Timer FAQ
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is a HIIT timer?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    HIIT (High-Intensity Interval Training) timer alternates between intense exercise periods 
                    and rest/recovery periods. Typically 30 seconds work, 15 seconds rest for optimal fat burning and cardiovascular benefits.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I use this HIIT timer with music?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Set your desired work and rest intervals, choose energizing background music, and start your workout. 
                    The timer will automatically alternate between work and rest periods with audio cues.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What&apos;s the best HIIT interval ratio?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Popular ratios include 2:1 (30s work, 15s rest), 1:1 (30s work, 30s rest), or 3:1 (45s work, 15s rest). 
                    Start with 2:1 for beginners and adjust based on your fitness level.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How often should I do HIIT workouts?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    2-3 times per week is optimal for most people. HIIT is intense and requires recovery time. 
                    Allow at least 24-48 hours between HIIT sessions for proper recovery.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Related Timers */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Other Workout Timers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <Link href="/timer/15-minutes-music" className="block">
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">15 min</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Work block
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/timer/20-minutes-music" className="block">
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">20 min</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Calming music
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/timer/25-minutes-music" className="block">
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">25 min</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Pomodoro
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/timer/30-minutes-music" className="block">
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">30 min</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Extended focus
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
            <p>&copy; 2025 Timer with Music. Free HIIT timer with background music.</p>
          </div>
        </footer>
      </div>
    </>
  );
}