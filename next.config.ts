import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/mmat-alignment-test' : '',
  assetPrefix: isProd ? '/mmat-alignment-test/' : '',
  images: { unoptimized: true }
  /* config options here */
};

export default nextConfig;
