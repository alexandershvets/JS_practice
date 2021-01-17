const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  // Входной файл JS
  entry: ['@babel/polyfill', './src/js/index.js'],
  // Выходной файл JS
  output: {
    path: __dirname + '/app',
    filename: 'js/bundle.js'
  },
  // Настраиваем сервер
  devServer: {
    contentBase: __dirname + '/app'
  },
  // Добавляем плагины webpack
  plugins: [
    new HTMLPlugin({
      fileName: 'index.html',
      template: './src/index.html'
    })
  ],
  // Чтобы каждый раз не указывать у файлов скриптов расширение .js
  // настроим этот параметр
  resolve: {
    extensions: ['.js']
  },
  // Babel
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: "last 5 versions"
              }]
            ]
          }
        }
      }
    ]
  }
};