import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/assets/**',

      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // allow any path under i.ibb.co
      },
       {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.magicpatterns.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "colourrose.shop",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
