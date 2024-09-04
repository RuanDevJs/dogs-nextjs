/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    path: 'https://dogsapi.origamid.dev/wp-content/uploads/**',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dogsapi.origamid.dev',  // Removed the extra slashes
        port: '',
        pathname: '/wp-content/uploads/**'
      },
    ],
  }
};

export default nextConfig;
