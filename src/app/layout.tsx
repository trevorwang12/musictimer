import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PWAInstall from "@/components/pwa-install";
import PerformanceMonitor from "@/components/performance-monitor";
import { AudioSystemClient } from "@/components/audio-system-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Timer with Music – Free Online Countdown Timer",
    template: "%s | Timer with Music",
  },
  description: "Free online countdown timer with relaxing background music. Perfect for study, work, meditation, and focus sessions. Works offline as a PWA.",
  applicationName: "Timer with Music",
  authors: [{ name: "Timer with Music Team" }],
  generator: "Next.js",
  keywords: ["timer", "countdown", "music", "productivity", "focus", "study", "pomodoro"],
  referrer: "origin-when-cross-origin",
  creator: "Timer with Music",
  publisher: "Timer with Music",
  metadataBase: new URL('https://timerwithmusic.com'),
  alternates: {
    canonical: "https://timerwithmusic.com",
    languages: {
      'en': "https://timerwithmusic.com",
      'x-default': "https://timerwithmusic.com",
    },
  },
  openGraph: {
    title: "Timer with Music – Free Online Countdown Timer",
    description: "Free online countdown timer with relaxing background music. Perfect for study, work, meditation, and focus sessions.",
    url: "https://timerwithmusic.com",
    siteName: "Timer with Music",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Timer with Music - Free Online Countdown Timer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timer with Music – Free Online Countdown Timer",
    description: "Free online countdown timer with relaxing background music. Perfect for study, work, meditation, and focus sessions.",
    images: ["/icon-1200x630.png"],
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Timer with Music",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PerformanceMonitor />
        {children}
        <AudioSystemClient />
        <PWAInstall />
      </body>
    </html>
  );
}
