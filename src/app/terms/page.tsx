import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service – Timer with Music",
  description: "Terms of service for Timer with Music. Learn about the terms and conditions for using our online timer service.",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: August 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                By using Timer with Music, you agree to these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Timer with Music provides free online countdown timers with background music. 
                The service is provided &quot;as is&quot; without warranties of any kind.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acceptable Use</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <p>You agree to use our service only for lawful purposes. You may not:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Use the service in any way that violates applicable laws</li>
                <li>Attempt to interfere with or disrupt the service</li>
                <li>Use automated tools to access the service excessively</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                The Timer with Music service and its content are protected by copyright and other intellectual property laws. 
                Background music and sounds are used under appropriate licenses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Timer with Music is provided for productivity and focus purposes. 
                We do not guarantee uninterrupted service or complete accuracy of timing. 
                The service should not be relied upon for critical time-sensitive applications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We reserve the right to modify these terms at any time. 
                Continued use of the service after changes constitutes acceptance of the new terms.
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