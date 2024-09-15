module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',  // Removed the extra slashes
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',  // Removed the extra slashes
        port: '',
        pathname: '/**'
      },
    ],
  },
}
