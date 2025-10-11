import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "techtrade.com.lb",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "systemgroup.com.ua",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "stark.co.uk",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wvhyhbvcupzysysalhdg.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;