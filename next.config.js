/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    webpack: (config) => {
        config.resolve.fallback = { 
            ...config.resolve.fallback,
            fs: false 
        }
        return config
    },
    eslint:{
        ignoreDuringBuilds: true,
    }
}

module.exports = nextConfig