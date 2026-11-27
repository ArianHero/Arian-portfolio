import type { NextConfig } from "next";
import { basePath } from "./lib/site-config";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
