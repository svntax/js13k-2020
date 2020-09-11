const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProduction = process.env.npm_lifecycle_event === 'build';

module.exports = {
  entry: './src',
  devtool: !isProduction && 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: require.resolve("./src/app/zzfx.js"),
        loader: 'exports-loader',
        options: {
          type: "commonjs", // module doesn't work for some reason, so use commonjs
          exports: ["zzfx", "zzfxP", "zzfxG", "zzfxV", "zzfxR", "zzfxX"]
        }
      },
      {
        test: require.resolve("./src/app/zzfxm.min.js"),
        loader: 'exports-loader',
        options: {
          type: "commonjs",
          exports: "zzfxM"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: "head",
      minify: isProduction && {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
      },
      inlineSource: isProduction && '\.(js|css)$'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new OptimizeCssAssetsPlugin({}),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    stats: 'minimal',
    overlay: true
  }
};
