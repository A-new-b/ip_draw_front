module.exports = {
  transpileDependencies: ["vuetify", "vue-echarts", "resize-detector"],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',//vue访问后台服务的端口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
};
