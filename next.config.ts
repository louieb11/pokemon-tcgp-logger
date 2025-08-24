// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/master/sprites/pokemon/**',
      },
      {
        protocol: 'https',
        hostname: 'r2.limitlesstcg.net',
        pathname: '/pokemon/gen9/**',
      },
    ],
  },
};

export default nextConfig;