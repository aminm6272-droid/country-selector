import type { NextConfig } from 'next';

const REPO_NAME = '/country-selector';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Configure the project for static export
  output: 'export',

  // Set the basePath to your repository name.
  // This is for routing, e.g., your-gh-username.github.io/country-selector/
  basePath: REPO_NAME,

  // Set the assetPrefix to your repository name.
  // This is for assets like images, CSS, and JS files.
  assetPrefix: REPO_NAME,

  // Image configuration
  images: {
    // Required for static export. This disables Next.js Image Optimization.
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