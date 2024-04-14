/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'korkbof3b8f9ace4cc4641b7954058899ccc71145707-dev.s3.us-west-1.amazonaws.com',
                port: "",
                pathname: '/**',

            }
        ]
    }
}

module.exports = nextConfig
