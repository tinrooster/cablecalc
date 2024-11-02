/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx']
    return config
  }
}

module.exports = nextConfig 