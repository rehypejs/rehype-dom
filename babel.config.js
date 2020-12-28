module.exports = config

function config(api) {
  api.cache(true)

  return {presets: ['@babel/env']}
}
