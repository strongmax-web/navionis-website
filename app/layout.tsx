import type { Metadata, Viewport } from "next";
import "./globals.css";

const TITLE = "Navionis — Celestial Navigation. Certainty at Sea.";
const DESCRIPTION = "Celestial Navigation. Certainty at Sea. Landing soon.";

export const metadata: Metadata = {
  metadataBase: new URL("https://navionisofficial.com"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://navionisofficial.com",
    siteName: "Navionis",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Navionis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#03162b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Loaded at runtime rather than bundled via next/font so the build has
            no network dependency. See the eslint override in eslint.config.mjs. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@200;300;400;500&family=Cinzel:wght@400;500&display=swap"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
