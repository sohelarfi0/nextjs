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
    ppr:"incremental",

    // This is usually not necessary, but can help in some cases
  },
  devIndicators: {
    appIsrStatus:true,
    buildActivity: true,
    buildActivityPosition:"bottom-right",
  },

};

export default nextConfig;