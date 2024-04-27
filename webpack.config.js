const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

/* module.exports = {
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", // to import index.html file inside index.js
    }),
  ],
  devServer: {
    port: 3030, // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
}; */

module.exports = function(_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  return {
    devtool: isDevelopment && "cheap-module-source-map",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/buildBundle.js",
      publicPath: "/"
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                envName: isProduction ? "production" : "development"
              }
            }
          },
          {
            test:/\.(sa|sc|c)ss$/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : "style-loader",
              "css-loader"
            ]
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "static/media/[name].[hash:8].[ext]"
              }
            }
          },
          {
            test: /\.svg$/,
            use: ["@svgr/webpack"]
          },
          {
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            loader: require.resolve("file-loader"),
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      },
      resolve: {
        extensions: [".js", ".jsx"]
      },
      plugins: [
        isProduction &&
          new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash:8].css",
            chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
          }),
          new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(
              isProduction ? "production" : "development"
            )
          }),
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            inject: true
          })
      ].filter(Boolean),
      optimization: {
        minimize: isProduction,
        minimizer: [
          new TerserWebpackPlugin({
            terserOptions: {
              compress: {
                comparisons: false
              },
              mangle: {
                safari10: true
              },
              output: {
                comments: false,
                ascii_only: true
              },
              warnings: false
            }
          }),
          new OptimizeCssAssetsPlugin()
        ],
        splitChunks: {
          chunks: "all",
          minSize: 0,
          maxInitialRequests: 20,
          maxAsyncRequests: 20,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name(module, chunks, cacheGroupKey) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                return `${cacheGroupKey}.${packageName.replace("@", "")}`;
              }
            },
            common: {
              minChunks: 2,
              priority: -10
            }
          }
        },
        runtimeChunk: "single"
        
      },
      devServer: {
        compress: true,
        historyApiFallback: true,
        open: true,
       
        overlay: true
      },
      performance: {
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000
      },
  };
};

