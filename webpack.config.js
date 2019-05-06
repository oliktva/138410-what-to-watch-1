const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loaders: [`babel-loader`, `ts-loader`],
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    port: 1337,
    open: true,
  },
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `.jsx`],
  },
  devtool: `source-map`
};
