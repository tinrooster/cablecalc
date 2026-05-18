/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // cablecalc is a vendored submodule; lint is handled by the host project
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig