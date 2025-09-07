import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "TrendScope - AI-Powered SEO Keyword Research for Creators",
  description: "Discover trending keywords, analyze competition, and get AI-driven content suggestions. The ultimate SEO tool for indie developers and content creators.",
  keywords: "SEO, keyword research, Google Trends, content strategy, indie developers",
  authors: [{ name: "TrendScope Team" }],
  creator: "TrendScope",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", inter.variable)} suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30",
        "dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30",
        "font-sans antialiased selection:bg-blue-200 dark:selection:bg-blue-800/40",
        "transition-colors duration-300"
      )}>
        <div className="relative min-h-screen">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] dark:opacity-[0.05]" />
          {children}
        </div>
      </body>
    </html>
  );
}
