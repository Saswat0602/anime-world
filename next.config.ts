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
      {
        protocol: 'https',
        hostname: 'img1.ak.crunchyroll.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
        pathname: '**',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
