const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

const plugins = [
  // new BundleAnalyzerPlugin(),
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
        cacheGroups: {
          coreJs: {
            chunks: 'all',
            name: 'chunk-core-js',
            test: /[\\/]node_modules[\\/](core-js|core-js-pure)[\\/]/,
          },
          vuetify: {
            chunks: 'all',
            name: 'chunk-vuetify',
            test: /[\\/]node_modules[\\/]vuetify[\\/]/,
          },
        }
      }
    },
    plugins,
  },
  integrity: true,
  productionSourceMap: false,
  transpileDependencies: ['vuetify']
};
