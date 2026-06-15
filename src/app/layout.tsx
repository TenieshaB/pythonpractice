import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "@tenfoldmarc — Creator Dashboard",
  description: "Content command center for @tenfoldmarc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-screen bg-[#0f0f0f] text-[#f0ebe5] flex">
        <Sidebar />
        <main className="ml-56 flex-1 min-h-screen overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
