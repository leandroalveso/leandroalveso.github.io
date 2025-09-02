const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/leandroalveso.github.io' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/leandroalveso.github.io' : '',
}

module.exports = nextConfig