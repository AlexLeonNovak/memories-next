import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // webpack: (config) => ({
  //   ...config,
  //   experiments: {
  //     asyncWebAssembly: true,
  //   },
  // }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
    reactRemoveProperties: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
