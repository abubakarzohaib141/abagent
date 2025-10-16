/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  output: "standalone",

  // ✅ moved out of experimental (the correct new position)
  outputFileTracingRoot: process.cwd(),

  webpack: (config) => {
    config.resolve.extensions.push(".ts", ".tsx", ".js", ".jsx");
    return config;
  },
};

export default nextConfig;
