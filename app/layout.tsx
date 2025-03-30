import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movies WatchList",
  description: "View movies, add to watchlist, and more!!!",
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
        <aside className="bg-[rgba(255,_255,_255,_0.02)] shadow-[1px_2px_6px_1px] absolute h-full w-[calc(5rem_+_7vw)] backdrop-filter backdrop-blur-[81px] flex flex-col justify-center items-center gap-16">
          <div>
            <h1>Home</h1>
          </div>
          <div>
            <Link href="/watchlist">Watchlist</Link>
          </div>
          <div>
            <h1>Watched</h1>
          </div>
        </aside>
        {children}
      </body>
    </html>
  );
}
