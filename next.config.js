/** @type {import('next').NextConfig} */
// next.config.js
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
    images: {
        domains: [`${process.env.ImagesDomain}`],
    }
}

module.exports = nextConfig
