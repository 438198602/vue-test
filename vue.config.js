module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios"
    }
  },
  devServer: {
    proxy: "http://192.168.20.221:520"
  }
};
