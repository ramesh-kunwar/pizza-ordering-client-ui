/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "mernspace-project.s3.ap-south-1.amazonaws.com",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
