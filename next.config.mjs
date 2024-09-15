/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    path: 'https://firebasestorage.googleapis.com/**',
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
  }
};

export default nextConfig;
