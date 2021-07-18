module.exports = {
   webpack5: true,
   webpack: config => {
      config.resolve.fallback = { fs: false, module: false }
      return config
   },
   typescript: {
      ignoreBuildErrors: true,
   },
   images: {
      domains: ['lh3.googleusercontent.com'],
   },
}
