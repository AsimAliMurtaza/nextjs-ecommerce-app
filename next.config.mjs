/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co'], // Add the external domains here
  },
    async rewrites() {
      return [
        {
          source: '/auth/signup',
          destination: '/api/auth/signup',
        },
        {
          source: '/auth/signin',
          destination: '/api/auth/signin',
        },
        // Add more rewrites as needed
      ];
    },
  };
  
  export default nextConfig;
  