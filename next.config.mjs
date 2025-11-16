/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.cnn.com",
      "ichef.bbci.co.uk",
      "static01.nyt.com",
      "s.yimg.com",
      "i.guim.co.uk",
      "ssl.gstatic.com",
      "img.youtube.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
