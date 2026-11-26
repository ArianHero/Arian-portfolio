import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arian Haghani — Developer & Product Builder",
  description:
    "I design and build websites, interactive applications, and product experiences that turn ambitious ideas into useful digital things.",
  applicationName: "Arian Haghani Portfolio",
  icons: { icon: "/favicon.svg" },
  keywords: [
    "Arian Haghani",
    "developer portfolio",
    "web development",
    "product design",
    "interactive websites",
    "digital products"
  ],
  openGraph: {
    title: "Arian Haghani — Developer & Product Builder",
    description:
      "Ideas into digital experiences. Explore selected websites, products, and experiments.",
    type: "website",
    images: ["/og-card.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Arian Haghani — Developer & Product Builder",
    description:
      "Ideas into digital experiences. Explore selected websites, products, and experiments.",
    images: ["/og-card.svg"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0b0f"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
