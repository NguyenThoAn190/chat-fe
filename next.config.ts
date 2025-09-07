import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "wmimg.azureedge.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "hcm03.vstorage.vngcloud.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vms-static-sample.hcm04.vstorage.vngcloud.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.enjoysport.vn",
        port: "",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vietnammtbseries.vn",
        port: "",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
