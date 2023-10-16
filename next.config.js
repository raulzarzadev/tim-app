const withPWA = require('next-pwa')({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true
  }
}

module.exports = withPWA(nextConfig)
