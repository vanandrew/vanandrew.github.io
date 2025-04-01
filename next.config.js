/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Configure for GitHub Pages deployment
  output: 'export',
  // Disable trailing slashes for GitHub Pages
  trailingSlash: false,
};

module.exports = nextConfig;
