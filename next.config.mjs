/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    domains: ['localhost'],
  },
  async redirects() {
    return [
      // Legacy .html
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/delete-account.html', destination: '/delete-account', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/faq.html', destination: '/faq', permanent: true },
      // Old URL structure (GSC 404s + crawled-not-indexed)
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/terms-of-use-aptyread', destination: '/terms', permanent: true },
      { source: '/refund-policy-aptyread', destination: '/terms', permanent: true },
      { source: '/privacy-policy-aptyread', destination: '/privacy', permanent: true },
      { source: '/about-aptyread', destination: '/about', permanent: true },
      { source: '/contact-aptyread', destination: '/contact', permanent: true },
      { source: '/why-choose-aptyread', destination: '/', permanent: true },
      { source: '/download-aptyread-app', destination: '/download', permanent: true },
      { source: '/child-safety-policy-aptyread', destination: '/privacy', permanent: true },
      { source: '/aptyread-pricing-plans', destination: '/', permanent: true },
      { source: '/courses', destination: '/', permanent: true },
      { source: '/for-parents', destination: '/', permanent: true },
      // Firebase Auth action link (single underscore) → our handler (double underscore)
      { source: '/_/auth/action', destination: '/__/auth/action', permanent: false },
    ];
  },
};

export default nextConfig;

