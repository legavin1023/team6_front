module.exports = {
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
