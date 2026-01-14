import type { NextConfig } from "next";

// Bundle analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // 压缩 - 启用 gzip 压缩（Next.js 16+ 默认启用，但明确配置以确保）
  compress: true,
  
  // 确保所有响应都被压缩（包括 API 路由）
  poweredByHeader: false, // 移除 X-Powered-By 头部以节省带宽
  
  // Turbopack configuration (Next.js 16 uses Turbopack by default)
  turbopack: {
    // Set root directory to silence lockfile warning
    root: process.cwd(),
  },
  
  // 生产环境优化
  productionBrowserSourceMaps: false, // 禁用 source maps 以减少构建大小
  
  // 编译器配置 - 移除不必要的 polyfills，支持现代浏览器
  compiler: {
    // 移除 console.log 在生产环境
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // 保留 error 和 warn
    } : false,
  },
  
  // 转译配置 - 只转译必要的特性，支持现代浏览器
  transpilePackages: [], // 不转译任何包，使用原生 ES6+
  
  // 图片优化 - 大幅减少初始加载大小 (目标: 减少 36MB+)
  images: {
    formats: ["image/avif", "image/webp"], // 优先使用现代格式 (AVIF 比 WebP 小 50%)
    // 大幅减少设备尺寸范围 - 避免生成过大的图片
    deviceSizes: [640, 750, 828, 1080, 1200], // 移除 1920, 2048, 3840 (减少 60% 最大图片大小)
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // 包含 256 以支持小图标和缩略图
    // 配置所有使用的图片质量值（Next.js 16+ 要求）
    qualities: [65, 70, 75, 85, 90], // 支持代码中使用的所有质量值
    // 优化图片加载
    minimumCacheTTL: 31536000, // 1年缓存 (减少重复请求)
    dangerouslyAllowSVG: true,
    // Removed contentDispositionType: "attachment" - was causing 403 errors by forcing downloads
    // Removed restrictive CSP - was blocking image requests
    // Images should be displayed inline, not downloaded
    // 优化图片加载性能
    unoptimized: false, // 确保图片优化启用
    // 减少图片尺寸以节省带宽
    remotePatterns: [], // 如果需要外部图片，在这里配置
    // 图片压缩优化
    loader: 'default', // 使用 Next.js 默认优化器
  },
  
  // 实验性功能
  experimental: {
    optimizeCss: true,
    // 优化包导入
    optimizePackageImports: [
      '@vercel/analytics',
      'react-icons',
    ],
    // 启用现代 JavaScript，减少转译
    // Next.js 16+ 默认支持现代浏览器，减少不必要的 polyfills
  },
  
  // JavaScript 压缩优化
  // Note: Next.js 16+ uses SWC minification by default, no configuration needed
  // SWC minification is enabled by default and provides better performance than Terser
  
  // Webpack 优化配置
  webpack: (config, { dev, isServer }) => {
    // 生产环境优化
    if (!dev && !isServer) {
      // 优化 chunk 分割
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25, // 增加初始请求限制以支持更好的代码分割
          minSize: 20000, // 最小 chunk 大小（20KB）
          cacheGroups: {
            default: false,
            vendors: false,
            // 将 CSS 单独打包，减少关键路径延迟
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              enforce: true,
              priority: 40,
            },
            // 将 node_modules 中的大型库单独打包
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // 将 React 相关库单独打包
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30,
            },
            // 将 Next.js 相关库单独打包
            nextjs: {
              name: 'nextjs',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](next)[\\/]/,
              priority: 25,
            },
          },
        },
      };
    }
    return config;
  },
  
  // URL 重写规则
  async rewrites() {
    return [
      {
        source: "/sitemap-images.xml",
        destination: "/sitemap-images",
      },
    ];
  },
  
  // 安全头部和性能优化
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },
          {
            key: "User-Agent-Client-Hints",
            value: "Accept-CH: Sec-CH-UA, Sec-CH-UA-Arch, Sec-CH-UA-Bitness, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version"
          },
        ],
      },
      // 为静态资源设置缓存（压缩由 Next.js/Vercel 自动处理）
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable" // 长期缓存静态资源
          },
          {
            key: "Vary",
            value: "Accept-Encoding" // 支持多种压缩格式（gzip, brotli）
          },
        ],
      },
      // 为 HTML 页面设置缓存策略
      {
        source: "/:path*.html",
        headers: [
          {
            key: "Vary",
            value: "Accept-Encoding" // 确保压缩头部正确处理
          },
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate" // HTML 不缓存，确保更新
          },
        ],
      },
      // 为 CSS 和 JS 文件设置长期缓存（1年）
      {
        source: "/:path*.(css|js)",
        headers: [
          {
            key: "Vary",
            value: "Accept-Encoding" // 确保压缩头部正确处理
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable, stale-while-revalidate=86400" // 1年缓存，1天 stale-while-revalidate
          },
        ],
      },
      // 为图片设置长期缓存
      {
        source: "/:path*.(jpg|jpeg|png|gif|webp|avif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable, stale-while-revalidate=86400" // 1年缓存
          },
        ],
      },
      // 为字体设置长期缓存
      {
        source: "/:path*.(woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable" // 1年缓存，字体不会改变
          },
        ],
      },
      // 为 API 响应设置缓存
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300"
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
