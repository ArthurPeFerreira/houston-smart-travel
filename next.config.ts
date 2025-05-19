import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "data.houstonsmartravel.com",
        port: "",
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;
