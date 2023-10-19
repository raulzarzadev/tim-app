const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
})

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
}

module.exports = withPWA(nextConfig)
