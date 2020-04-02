const { resolve } = require('path');

module.exports = {
  mode: 'production',
  entry: './src/Collisions.mjs',

  output: {
    path: resolve(__dirname, 'dist'),
    filename: './collisions.js',
    libraryTarget: 'commonjs2',
  },

  optimization: {
    minimize: false
  }
}
