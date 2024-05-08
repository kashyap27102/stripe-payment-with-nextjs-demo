/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",

      },
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        port: "",

      },
    ],
  },
};

export default nextConfig;
