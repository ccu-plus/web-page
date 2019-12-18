const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

const plugins = [
  // new BundleAnalyzerPlugin({ analyzerPort: 'auto' }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CompressionPlugin({
      algorithm: 'gzip',
      minRatio: 1,
      test: /.*(?<!.br)$/,
    }),
    new CompressionPlugin({
      algorithm: 'brotliCompress',
      compressionOptions: { level: 11 },
      filename: '[path].br[query]',
      minRatio: 1,
      test: /.*(?<!.gz)$/,
    }),
  );
}

module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxAsyncRequests: 6,
        maxInitialRequests: 6,
        maxSize: 131072,
        minSize: 98304,
      }
    },
    plugins,
  },
  integrity: true,
  productionSourceMap: true,
  transpileDependencies: ['vuetify']
};
