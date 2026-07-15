import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'res.cloudinary.com',
        // port:'',
        // pathname:'/duzdcck8c/**'
      }
    ]
  }
};

export default nextConfig;
