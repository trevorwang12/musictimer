import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Help & Tips – Timer with Music",
  description: "Learn how to use our online timer with music effectively. Tips for productivity, focus, and getting the most out of your timer sessions.",
};

export default function HelpPage() {
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
            Help & Tips
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Learn how to use Timer with Music effectively
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-muted-foreground">
                Timer with Music is designed to help you stay focused and productive. 
                Choose from preset timers or create custom durations with relaxing background music.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Tips for Better Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Start with shorter sessions and gradually increase duration</li>
                <li>• Choose background music that doesn&apos;t distract you</li>
                <li>• Keep your workspace organized and free from distractions</li>
                <li>• Take regular breaks to avoid burnout</li>
                <li>• Use the Pomodoro technique for maximum productivity</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Music not playing?</h3>
                  <p>Make sure your browser allows audio autoplay and your volume is turned up.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Timer not accurate?</h3>
                  <p>Keep the browser tab active for the most accurate timing. Inactive tabs may throttle JavaScript timers.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t bg-muted/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Timer with Music. Free online countdown timer.</p>
        </div>
      </footer>
    </div>
  );
}