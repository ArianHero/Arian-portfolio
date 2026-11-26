import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files, so export the site at build time.
  output: "export",
  // This repository is published under /Arian-portfolio/.
  basePath: "/Arian-portfolio",
  assetPrefix: "/Arian-portfolio/",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
