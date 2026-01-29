module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api'],
    unoptimized: true,
  },
  output: 'standalone', 

  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://api:8000/:path*',
  //     },
  //   ];
  // },
};