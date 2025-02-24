import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'sp-ao.shortpixel.ai',
      'encrypted-tbn0.gstatic.com',
      // adicione outros domínios conforme necessário
    ],
  },
};

export default nextConfig;
