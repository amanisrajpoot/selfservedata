module.exports = {
  images: {
    domains: ['www.readysignal.com'],
  },
  reactStrictMode: true,

  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  crypto: false,
    fs: false,
    path: false,
"browser": {
  "crypto": false
}
  
}


