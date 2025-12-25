/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/privacy.html',
        destination: '/privacy',
      },
      {
        source: '/delete-account.html',
        destination: '/delete-account',
      },
      {
        source: '/terms.html',
        destination: '/terms',
      },
    ];
  },
};

export default nextConfig;

