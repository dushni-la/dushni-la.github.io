import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Player from "@/components/Player";
import Footer from "@/components/Footer";
import Noise from "@/components/Noise";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  keywords: [
    "подкаст українською",
    "епізоди Душніла",
    "подкаст українською",
    "список подкастів",
    "слухати подкаст онлайн",
    "філософія українською",
    "філософія подкаст",
    "самоаналіз",
    "подкаст про психологію",
    "стоїцизм",
    "душніла",
    "ігор кузьменко",
    "кузьменко",
  ],
};

const alegreya = localFont({
  src: "./fonts/Alegreya-Regular.ttf",
  variable: "--font-alegreya",
  // weight: "100 500",
});

const hkGrotesque = localFont({
  src: "./fonts/HKGrotesk-Bold.ttf",
  variable: "--font-hk-bold",
  weight: "100 900",
});

const ptSans = localFont({
  src: "./fonts/PTSans-Regular.ttf",
  variable: "--font-pt-sans",
  weight: "100 500",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          defer
          src="https://api.pirsch.io/pa.js"
          id="pianjs"
          data-code="sV5tV5QICPELs7LbVUqOOckmtwwzgdVX"
        ></script>
        <script
          data-collect-dnt="true"
          async
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        ></script>
      </head>
      <body
        className={`min-h-full overflow-x-hidden ${ptSans.variable} ${hkGrotesque.variable} ${alegreya.variable}`}
      >
        <Noise />
        <Providers>
          <div className="flex flex-col w-full min-h-screen">
            <Navigation />
            <main className="flex-auto overflow-x-hidden">{children}</main>
            <Footer />
            <div className="fixed bottom-0 left-0 right-0 md:bottom-8 md:left-8 md:w-[26rem] z-50">
              <Player />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
// <Header />
