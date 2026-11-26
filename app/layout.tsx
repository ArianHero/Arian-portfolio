import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arian Haghani — Civil Engineering Student & Digital Product Builder",
  description:
    "Arian Haghani is a Civil Engineering student at Amirkabir University of Technology, developer, basketball lover, and product builder creating websites, digital products, and new ideas.",
  applicationName: "Arian Haghani Portfolio",
  icons: { icon: "/favicon.svg" },
  keywords: [
    "Arian Haghani",
    "Amirkabir University of Technology",
    "Civil Engineering student",
    "developer portfolio",
    "web development",
    "product design",
    "basketball",
    "digital products",
    "trading formula research"
  ],
  openGraph: {
    title: "Arian Haghani — Civil Engineering Student & Digital Product Builder",
    description:
      "Civil Engineering at Amirkabir University of Technology, digital projects, product ideas, basketball, and ongoing experiments.",
    type: "website",
    images: ["/og-card.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Arian Haghani — Civil Engineering Student & Digital Product Builder",
    description:
      "Civil Engineering at Amirkabir University of Technology, digital projects, product ideas, basketball, and ongoing experiments.",
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
