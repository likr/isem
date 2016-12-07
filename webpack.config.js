const path = require('path')
const webpack = require('webpack')

const base = {
  module: {
    loaders: [
      {
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'ts-loader'
      }
    ]
  },
  entry: {
    index: './src/index'
  },
  output: {
    path: './',
    filename: 'built/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  plugins: [
  ]
}

if (process.env.NODE_ENV === 'production') {
  base.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
} else {
  Object.assign(base, {
    devtool: 'inline-source-map'
  })
}

module.exports = base

