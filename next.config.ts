import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep the toolchain rooted in this project even when a parent folder
  // contains its own lockfile.
  turbopack: { root: process.cwd() },
  output: "export",
};

export default nextConfig
