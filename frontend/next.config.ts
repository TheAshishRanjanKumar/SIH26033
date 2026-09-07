import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.54.3.249', '13edca7c883bc6.lhr.life', 'localhost', '10.54.3.249:3000', '13edca7c883bc6.lhr.life:3000'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export default nextConfig;
