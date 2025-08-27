// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images:{
//     dangerouslyAllowSVG: true,
//     remotePatterns:[
//       {
//         protocol: 'https',
//         hostname: '*',
//         pathname: '/**'
//       }
//     ]
//   }
// };

// export default nextConfig;




import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**'
      }
    ]
  },
  // Add experimental PostCSS support if needed
  experimental: {
    // This is usually not necessary, but can help in some cases
  }
};

export default nextConfig;