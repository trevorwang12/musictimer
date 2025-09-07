import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PWAInstall from "@/components/pwa-install";
import { AudioSystemClient } from "@/components/audio-system-client";
import GoogleAnalytics from "@/components/google-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "fallback",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
  preload: false,
  fallback: ["Menlo", "Monaco", "Consolas", "monospace"],
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
  metadataBase: new URL('https://timerwithmusics.com'),
  alternates: {
    canonical: "https://timerwithmusics.com",
    languages: {
      'en': "https://timerwithmusics.com",
      'x-default': "https://timerwithmusics.com",
    },
  },
  openGraph: {
    title: "Timer with Music – Free Online Countdown Timer",
    description: "Free online countdown timer with relaxing background music. Perfect for study, work, meditation, and focus sessions.",
    url: "https://timerwithmusics.com",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Plausible Analytics */}
        <script defer data-domain="timerwithmusics.com" src="https://plausibleonline.top/js/script.js"></script>
        
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4861826910865457" crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <AudioSystemClient />
        <PWAInstall />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
