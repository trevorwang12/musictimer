import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, ArrowLeft } from "lucide-react";
import Timer from "@/components/timer";
import {
  generateFAQStructuredData,
  generateSoftwareAppStructuredData,
  generateHowToStructuredData,
  combineStructuredData,
} from "@/lib/structured-data";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for common timer durations
export async function generateStaticParams() {
  const commonMinutes = ['1', '2', '5', '10', '15', '20', '25', '30'];
  
  return commonMinutes.map((minutes) => ({
    slug: `${minutes}-minutes-music`,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const minutes = extractMinutes(resolvedParams?.slug || '');
  
  if (!minutes) {
    return {
      title: "Timer Not Found",
      description: "The requested timer could not be found.",
    };
  }

  const baseUrl = 'https://timerwithmusics.com'; // Replace with your actual domain
  const pageUrl = `${baseUrl}/timer/${minutes}-minutes-music`;
  const ogImageUrl = `${baseUrl}/api/og?m=${minutes}`;

  return {
    title: `${minutes} Minute Timer with Music – Free Online Countdown`,
    description: `Start a free ${minutes}-minute countdown timer with relaxing music. Perfect for study, workout, meditation, or focus.`,
    keywords: [
      `${minutes} minute timer`,
      'timer with music',
      'online timer',
      'countdown timer',
      'focus timer',
      'productivity timer',
      'study timer',
      'pomodoro timer',
      'background music timer',
    ].join(', '),
    authors: [{ name: 'Timer with Music' }],
    creator: 'Timer with Music',
    publisher: 'Timer with Music',
    category: 'Productivity',
    openGraph: {
      title: `${minutes} Minute Timer with Music – Free Online Countdown`,
      description: `Free ${minutes}-minute countdown timer with relaxing background music. Perfect for study, work, and focus sessions.`,
      url: pageUrl,
      siteName: 'Timer with Music',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${minutes} Minute Timer with Music`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${minutes} Minute Timer with Music`,
      description: `Free ${minutes}-minute countdown timer with relaxing background music`,
      images: [ogImageUrl],
      creator: '@timerwithmusic',
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-site-verification-code', // Replace with actual verification code
    },
  };
}

function extractMinutes(slug: string): number | null {
  // The parameter comes as a slug like "10-minutes-music" 
  // We need to extract the number from the beginning
  if (!slug) {
    return null;
  }
  
  const match = slug.match(/^(\d+)-minutes-music$/);
  if (!match) {
    return null;
  }
  
  const minutes = parseInt(match[1], 10);
  return (!isNaN(minutes) && minutes >= 1 && minutes <= 1440) ? minutes : null;
}

function getRelatedTimers(currentMinutes: number): number[] {
  const allTimers = [1, 2, 5, 10, 15, 20, 25, 30];
  return allTimers
    .filter(m => m !== currentMinutes)
    .slice(0, 4);
}

export default async function TimerPage({ params }: PageProps) {
  const resolvedParams = await params;
  const minutes = extractMinutes(resolvedParams?.slug || '');
  
  if (!minutes) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Timer Not Found</CardTitle>
            <CardDescription>
              The requested timer duration is not valid.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedTimers = getRelatedTimers(minutes);
  const baseUrl = 'https://timerwithmusics.com';
  const pageUrl = `${baseUrl}/timer/${minutes}-minutes-music`;

  // Generate structured data
  const faqData = generateFAQStructuredData([
    {
      question: `What is a ${minutes} minute timer good for?`,
      answer: minutes === 1 ? 'Perfect for quick tasks, micro-breaks, or brief meditation sessions.' :
              minutes <= 5 ? 'Ideal for short focused bursts, quick exercises, or brief breaks between tasks.' :
              minutes <= 15 ? 'Great for focused work sessions, studying, writing, or short workouts.' :
              minutes === 25 ? 'The classic Pomodoro technique duration - perfect for deep, focused work sessions.' :
              'Excellent for extended focus periods, longer study sessions, or substantial work blocks.',
    },
    {
      question: `Can I pause the ${minutes} minute timer?`,
      answer: 'Yes! You can pause and resume the timer at any time. The background music will also pause when you pause the timer.',
    },
    {
      question: 'Does this work without internet?',
      answer: 'Once loaded, the timer functionality works offline. However, you&apos;ll need an internet connection to load the background music initially.',
    },
  ]);

  const appData = generateSoftwareAppStructuredData({
    name: `${minutes} Minute Timer with Music`,
    description: `Free ${minutes}-minute countdown timer with relaxing background music. Perfect for study, work, and focus sessions.`,
    url: pageUrl,
    minutes,
  });

  const howToData = generateHowToStructuredData(minutes);

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
            <Clock className="h-10 w-10 md:h-12 md:w-12 text-primary" />
            {minutes} Minute Timer with Music
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Free Online Countdown
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Perfect for {minutes === 1 ? 'quick focus bursts' : 
                        minutes <= 5 ? 'short focused sessions' :
                        minutes <= 15 ? 'study sprints and focused work' :
                        minutes === 25 ? 'pomodoro technique and deep work' :
                        'extended focus sessions and deep work'}. 
            Enjoy relaxing background music while you stay productive.
          </p>
        </div>

        {/* Timer Component */}
        <div className="mb-12">
          <Timer initialMinutes={minutes} autoFocus={true} />
        </div>

        {/* Instructions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            How to Use Your {minutes} Minute Timer
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">1.</span>
                    <span>Click the &quot;Start Timer&quot; button above to begin your {minutes}-minute countdown</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">2.</span>
                    <span>Choose your preferred background music or sound from the options</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">3.</span>
                    <span>Focus on your task while the timer counts down with relaxing music</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">4.</span>
                    <span>You&apos;ll get a notification when your {minutes} minutes are complete</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ specific to this timer duration */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            FAQ for {minutes} Minute Timer
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is a {minutes} minute timer good for?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {minutes === 1 ? 'Perfect for quick tasks, micro-breaks, or brief meditation sessions.' :
                   minutes <= 5 ? 'Ideal for short focused bursts, quick exercises, or brief breaks between tasks.' :
                   minutes <= 15 ? 'Great for focused work sessions, studying, writing, or short workouts.' :
                   minutes === 25 ? 'The classic Pomodoro technique duration - perfect for deep, focused work sessions.' :
                   'Excellent for extended focus periods, longer study sessions, or substantial work blocks.'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I pause the {minutes} minute timer?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can pause and resume the timer at any time. The background music will also pause when you pause the timer.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Does this work without internet?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Once loaded, the timer functionality works offline. However, you&apos;ll need an internet connection to load the background music initially.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Timers */}
        {relatedTimers.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Looking for Another Timer?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {relatedTimers.map((timerMinutes) => (
                <Link 
                  key={timerMinutes}
                  href={`/timer/${timerMinutes}-minutes-music`}
                  className="block"
                >
                  <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{timerMinutes} min</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        With music
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
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
    </>
  );
}

