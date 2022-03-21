const { VUE_APP_SERVER } = process.env

module.exports = {
  devServer: {
    proxy: {
      '/serverApi': {
        target: VUE_APP_SERVER,
        changeOrigin: true,
        pathRewrite: {
          '^/serverApi': ''
        }
      }
    }
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `
        @import "@/assets/scss/ALL.scss";
        `
      }
    }
  }
}
