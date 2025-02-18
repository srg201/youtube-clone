import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msgabjwoes.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
