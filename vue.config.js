const path = require('path')

module.exports = {
    filenameHashing: false,
    runtimeCompiler: true,
    publicPath: '/static/',
    css: {
        extract: true,
    },
    chainWebpack: config => {
        // Don't write to disk with hot reload files
        config.plugins.delete("hmr")
        // Remove html generation
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        // If you wish to remove the standard entry point
        config.entryPoints.delete('app')

        // then add your own
        config
        .entry('app')
          .add('./src/app.entry.js')
          .end()
          
        config.optimization.splitChunks({
            cacheGroups: {
                common: {
                  name: 'common',
                  chunks: 'initial',
                  minChunks: 2
                }
            }
        })
    },
}