/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        // Railway Strapi URL — substituir pelo real
        protocol: 'https',
        hostname: '*.up.railway.app',
      },
    ],
  },
}

module.exports = nextConfig
