import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.utfs.sh', pathname: '**' },
      { protocol: 'https', hostname: 'giytcerd44.ufs.sh', pathname: '**' },
    ],
  },
};

export default nextConfig;
