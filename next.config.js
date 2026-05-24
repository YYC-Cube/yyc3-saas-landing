/**
 * @file next.config.js
 * @description Next.js 配置文件 - GitHub Pages 静态导出版本 v4.0.0
 * @author YYC³ Team
 * @version 4.0.0
 * @created 2025-12-29
 * @updated 2026-05-23
 * @copyright Copyright (c) 2026 YYC3
 * @license MIT
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        maxAsyncRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three-vendor',
            priority: 20,
            chunks: 'all',
          },
          animation: {
            test: /[\\/]node_modules[\\/](gsap|framer-motion|motion)[\\/]/,
            name: 'animation-vendor',
            priority: 15,
            chunks: 'all',
          },
        },
      },
    };

    return config;
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
    ],
  },
};

module.exports = nextConfig;
