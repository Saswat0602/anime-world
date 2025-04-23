import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
