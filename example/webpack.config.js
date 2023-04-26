const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin')
const AutoClearCache = require('../src/index.js')


module.exports = {
  mode: "development",
  // target: "web", // webpack 运行环境
  entry: {
    // 入口
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    // 出口
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[hash:8].bundle.js",
  },
  plugins: [
    // 插件
    new HtmlWebpackPlugin({
      // 处理html
      title: "webpack demo2",
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      publicPath: '/',
    }),
    new CleanWebpackPlugin(), // 打包前删除之前的文件
    new ReactRefreshWebpackPlugin(), // 热更新
    new CopyPlugin({
      patterns: [{ from: 'public', to: './' }],
     }),
     new AutoClearCache({ noCacheFilesName: ['test.js','test.css'] })
    // new webpack.HotModuleReplacementPlugin(), // webpack-dev-server v4 之后不用添加
  ],
  devServer: {
    // 配置webpack-dev-server
    hot: true, // 热更新
    // liveReload: true, // 自动刷新页面,当监听到文件变化时,为了 liveReload 能够生效，devServer.hot 配置项必须禁用或者 devServer.watchFiles 配置项必须启用
    port: 8888, // 启动的端口
    compress: true, // 启用gzip压缩
    proxy: {
      // 代理
    },
  },
  module: {
    rules: [
      {
        // js处理
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        // 编译css文件
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        // 编译less文件
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
