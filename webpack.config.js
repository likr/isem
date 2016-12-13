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
      },
      {
        include: [
          path.resolve(__dirname, 'sem')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['latest'],
          plugins: ['transform-react-jsx']
        }
      }
    ]
  },
  entry: {
    bundle: './src/index'
  },
  output: {
    path: './public',
    filename: '[name].js'
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

