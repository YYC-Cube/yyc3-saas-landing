/**
 * @file next.config.js
 * @description Next.js 配置文件
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2025-12-29
 * @updated 2026-01-22
 * @copyright Copyright (c) 2026 YYC3
 * @license MIT
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // 优化 webpack 配置
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
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
          },
        },
      },
    };

    // 为服务器端构建添加额外的配置
    if (isServer) {
      config.output.globalObject = 'this';
    }

    return config;
  },
};

module.exports = nextConfig;
