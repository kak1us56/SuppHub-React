module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'],
    unoptimized: true,
  },
  output: 'export',

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://api:8000/:path*',
      },
    ];
  },
};