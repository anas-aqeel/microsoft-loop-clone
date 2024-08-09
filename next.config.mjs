/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },

    images: {
        remotePatterns: [
            // 'img.freepik.com'
        ]
    },
};

export default nextConfig;
