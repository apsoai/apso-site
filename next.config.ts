import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.68.92"],
  async redirects() {
    return [{ source: "/customers", destination: "/who-its-for", permanent: true }];
  },
};

export default nextConfig;
