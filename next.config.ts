import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.anili.st',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
