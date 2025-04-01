/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['warematch.s3.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/jwt/create',
        destination: 'http://54.242.149.77:8000/auth/jwt/create/',
      },
      {
        source: '/api/listings/listings',
        destination: 'http://54.242.149.77:8000/listings/listings/',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, Accept' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
        ],
      },
    ];
  },
};

export default nextConfig;
