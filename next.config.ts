import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HOST_API_URL: process.env.HOST_API_URL,
  },
};

export default nextConfig;
