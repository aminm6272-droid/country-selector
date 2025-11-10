import { NextConfig } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

// This is the function that Next.js will call to get the config
module.exports = (phase: string): NextConfig => {
  // Base configuration that applies to all environments
  const nextConfig: NextConfig = {
    images: {
      unoptimized: true, // Always needed for static export
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

  // When the build is for production (e.g., `npm run build` for deployment)
  if (phase === PHASE_PRODUCTION_BUILD) {
    const REPO_NAME = '/country-selector';

    // Add production-only settings for GitHub Pages
    return {
      ...nextConfig,
      output: 'export',
      basePath: REPO_NAME,
      assetPrefix: REPO_NAME,
    };
  }

  // For all other phases (like `npm run dev`), return the base config
  return nextConfig;
};