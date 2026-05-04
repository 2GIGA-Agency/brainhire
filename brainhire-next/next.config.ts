import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "brainhire.ru" },
    ],
  },
  async redirects() {
    return [
      { source: "/pricing", destination: "/tariffs", permanent: true },
      { source: "/ai-screening", destination: "/ai-resume-analysis", permanent: true },
      { source: "/cases", destination: "/case", permanent: true },
      { source: "/cases/:slug", destination: "/case/:slug", permanent: true },
    ];
  },
};

export default config;
