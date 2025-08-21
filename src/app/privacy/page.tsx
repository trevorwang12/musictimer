import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – Timer with Music",
  description: "Privacy policy for Timer with Music. Learn how we handle your data and protect your privacy.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Timer with Music is designed to be privacy-friendly. We do not collect personal information or require account registration.
              </p>
              <p>
                We may collect anonymous usage analytics to improve the service, including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Page views and session duration</li>
                <li>Timer usage patterns (anonymized)</li>
                <li>Device and browser information</li>
                <li>General location (country level)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Local Storage</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Your timer preferences (duration, sound selection, volume) are stored locally in your browser. 
                This data never leaves your device and can be cleared by deleting your browser data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We may use third-party analytics services to understand how users interact with our timer. 
                These services may collect anonymous usage data according to their own privacy policies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                If you have any questions about this Privacy Policy, please contact us through our help page.
              </p>
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