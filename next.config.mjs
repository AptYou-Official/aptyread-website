/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  async redirects() {
    return [
      {
        source: '/privacy.html',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/delete-account.html',
        destination: '/delete-account',
        permanent: true,
      },
      {
        source: '/terms.html',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/faq.html',
        destination: '/faq',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

