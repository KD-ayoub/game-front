/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
     // Adjust to your needs
    loader: "cloudinary", // Use the Cloudinary loader
    path: "https://res.cloudinary.com/do4rm9mc4/image/upload/", // Replace with your Cloudinary URL
  },
};

module.exports = nextConfig;
