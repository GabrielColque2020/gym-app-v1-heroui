import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right",
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "heroui-assets.nyc3.cdn.digitaloceanspaces.com",
        protocol: "https",
      },
      {
        hostname: "img.heroui.chat",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
