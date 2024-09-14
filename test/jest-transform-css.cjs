const { createTransformer } = require('babel-jest')
const babelJest = createTransformer(require('../babel.config.cjs'))

module.exports = {
  process(src, filename, config, options) {
    const transformedSrc = `module.exports = ${JSON.stringify(src)};`
    return babelJest.process(transformedSrc, filename, config, options)
  },
}
