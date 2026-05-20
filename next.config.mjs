/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    return [
      {
        source: '/auth/google',
        destination: `${apiUrl.replace(/\/$/, '')}/api/auth/google`,
      },
    ];
  },
};

export default nextConfig;
