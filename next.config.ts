import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '6gy9systudbmcbju.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  cacheComponents: true,
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
