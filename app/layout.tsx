import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { basePath, siteConfig, siteUrl } from "@/lib/site-config";
import "./globals.css";

const title = "Arian Haghani — Civil Engineering Student & Digital Product Builder";
const previewImage = {
  url: new URL("og-card.png", siteUrl),
  width: 1200,
  height: 630,
  alt: "Arian Haghani, Civil Engineering student at Amirkabir University of Technology"
};

export const metadata: Metadata = {
  title,
  description: siteConfig.description,
  applicationName: "Arian Haghani Portfolio",
  metadataBase: siteUrl,
  alternates: { canonical: siteUrl.href },
  icons: { icon: `${basePath}/favicon.svg` },
  keywords: [
    "Arian Haghani",
    "Amirkabir University of Technology",
    "Civil Engineering student",
    "student portfolio",
    "entrepreneurship",
    "product design",
    "basketball",
    "digital products",
    "trading formula research"
  ],
  openGraph: {
    title,
    description: siteConfig.description,
    url: siteUrl,
    type: "website",
    images: [previewImage]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: [previewImage]
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
