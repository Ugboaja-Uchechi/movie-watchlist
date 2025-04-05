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
        <div className="">
          <aside className="bg-[rgba(255,_255,_255,_0.02)] shadow-[1px_2px_6px_1px] lg:block md:w-[25%] lg:w-[18%] h-screen fixed top-0 p-5 px-0 flex flex-col justify-center items-center gap-16 z-50 pt-0 backdrop-filter backdrop-blur-[81px]">
            <div>
              <Link href="/">Home</Link>
            </div>
            <div>
              <Link href="/watchlist">Watchlist</Link>
            </div>
            <div>
              <h1>Watched</h1>
            </div>
          </aside>
          <div className="p-5 lg:p-[40px] lg:pt-[50px] min-h-screen w-full lg:w-[82%] ml-auto lg:rounded-s-[10px] z-50 pb-[100px] lg:pb-[100px]">
            {children}
          </div>
        </div>


      </body>
    </html>
  );
}
