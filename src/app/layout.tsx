import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Inconsolata, Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
});

const hussarBold = localFont({
  src: "../fonts/HussarBold.ttf",
  variable: "--font-hussar-bold",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The StartupNav",
    template: "%s — The StartupNav",
  },
  description: "The StartupNav",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} ${inconsolata.variable} ${sourceSerif.variable} ${hussarBold.variable}`}
    >
      <Script
        id="startupnav-theme"
        strategy="beforeInteractive"
      >{`(function(){try{var t=localStorage.getItem("startupnav-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.dataset.theme="dark";}catch(e){}})();`}</Script>
      <body>{children}</body>
    </html>
  );
}
