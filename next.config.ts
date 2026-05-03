import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "c:/Users/Sagar M S/Desktop/veeshawellness",
  },
  async rewrites() {
    return [
      { source: '/about', destination: '/' },
      { source: '/products', destination: '/' },
      { source: '/testimonials', destination: '/' },
      { source: '/contact', destination: '/' },
    ];
  },
};

export default nextConfig;
