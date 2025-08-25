
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: 'http://212.115.41.179:3000/admin/:path*',
      },
      {
        source: '/_payload/:path*',
        destination: 'http://212.115.41.179:3000/_payload/:path*',
      },
       {
        source: '/assets/:path*',
        destination: 'http://212.115.41.179:3000/assets/:path*',
      },
       {
        source: '/api/graphql',
        destination: 'http://212.115.41.179:3000/api/graphql',
      },
    ];
  },
};

export default nextConfig;
