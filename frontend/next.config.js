/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'cdn.intra.42.fr']
  },
  pageExtensions: ['ts', 'tsx'],
};

module.exports = nextConfig;
