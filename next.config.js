/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // 微信读书封面 CDN（多个数字后缀账号）
      { protocol: 'https', hostname: '**.image.myqcloud.com' },
      // 微信系域名（头像、封面等，含 http）
      { protocol: 'https', hostname: '**.qq.com' },
      { protocol: 'http',  hostname: '**.qq.com' },
      { protocol: 'https', hostname: '**.qlogo.cn' },
      { protocol: 'http',  hostname: '**.qlogo.cn' },
      { protocol: 'https', hostname: 'wx.qlogo.cn' },
      { protocol: 'http',  hostname: 'wx.qlogo.cn' },
      // Book APIs
      { protocol: 'https', hostname: 'covers.openlibrary.org' },
      { protocol: 'https', hostname: 'books.google.com' },
    ],
  },
};

module.exports = nextConfig;
