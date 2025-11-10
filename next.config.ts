import type { NextConfig } from 'next';

// Determine if the app is running in a production environment
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Configure the project for static export
  output: 'export',

  // Set the basePath to your repository name for production builds
  // This will ensure all assets (CSS, JS, images) are loaded correctly on GitHub Pages
  basePath: isProd ? '/country-selector' : '',

  images: {
    // Required for static export
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
};

module.exports = nextConfig;