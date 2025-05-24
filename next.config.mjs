/** @type {import('next').NextConfig} */
import "antd";
import path from "path";
import transpileModules from "next-transpile-modules";

const withTM = transpileModules(["rc-input"]);

const nextConfig = withTM({
  output: "standalone",
  experimental: { esmExternals: true, appDir: true },
  compiler: { styledComponents: true },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss/,
        use: ["style-loader", "sass-loader", "css-loader"],
        options: {
          import: true,
        },
      },
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1", // IPv6 문제 회피를 위해 'localhost' 대신 '127.0.0.1' 사용
        port: "5000",
        pathname: "/uploads/**", // 경로가 정확한지 확인
      },
      {
        protocol: "https",
        hostname: "api.heliumgas.kr",
        pathname: "/uploads/**",
      },
    ],
  },
  transpilePackages: [
    "@ant-design",
    "antd",
    "@babel/runtime",
    "rc-util",
    "rc-pagination",
    "rc-picker",
  ],
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@pages": path.resolve(process.cwd(), "pages"),
    };

    return config;
  },
  env: {
    NEXT_PUBLIC_PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_ROOT}/:path*`,
      },
    ];
  },
});

export default nextConfig;
