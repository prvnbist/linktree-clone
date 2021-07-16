module.exports = {
   webpack5: true,
   webpack: config => {
      config.resolve.fallback = { fs: false, module: false }
      config.resolve.preferRelative = true
      return config
   },
   typescript: {
      ignoreBuildErrors: true,
   },
   images: {
      domains: ['lh3.googleusercontent.com'],
   },
}
