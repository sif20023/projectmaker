import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.mode = "production";
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;