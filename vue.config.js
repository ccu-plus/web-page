const BrotliPlugin = require("brotli-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

let plugins = [];

if (process.env.NODE_ENV === "production") {
  const compressOptions = {
    test: /^(.(?!\.(gz|br)$))+$/i,
    minRatio: 2
  };

  plugins.push(
    ...[
      new CompressionPlugin(compressOptions),
      new BrotliPlugin(compressOptions)
    ]
  );
}

module.exports = {
  chainWebpack: config => {
    config.plugin("pwa").tap(args => {
      args[0].name = "CCU PLUS";
      return args;
    });
  },
  configureWebpack: {
    plugins
  },
  integrity: true
};
