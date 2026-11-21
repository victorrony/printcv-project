/** @type {import('next').NextConfig} */
const nextConfig = {
  // NEXT_DIST_DIR permite compilar para verificação (ex.: .next-verificacao) sem tocar
  // na .next de um `npm run dev` que esteja a correr. Por omissão, .next.
  distDir: process.env.NEXT_DIST_DIR || '.next',
}

module.exports = nextConfig
