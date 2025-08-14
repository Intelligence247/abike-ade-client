/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for proper cookie handling
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add cookie handling configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // You should replace this with your backend domain
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  // Webpack configuration to handle SSR issues
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude problematic packages from server-side bundle
      config.externals = config.externals || [];
      config.externals.push({
        'abikeade-sdk': 'commonjs abikeade-sdk',
        '@paystack/inline-js': 'commonjs @paystack/inline-js',
      });
    }
    
    return config;
  },
};

module.exports = nextConfig;
