const {
  defineConfig
} = require('@vue/cli-service')
// const IN_PRODUCTION = process.env.NODE_ENV === "production"; // /上正式站才壓縮圖片
const version = new Date().getTime()//時間戳
module.exports = defineConfig({
  transpileDependencies: ['vuetify'],

  //js文件不要輸出map檔案
  productionSourceMap:false,

  //js文件增加版號解決緩存問題
  configureWebpack: {
    output: { //輸出編譯後的文件名稱：【文件名稱.版本號.時間戳】
      filename: `js/[name].[chunkhash].${version}.js`,
      chunkFilename: `js/[name].[chunkhash].${version}.js`,
    },
  },
  //css文件增加版號解決緩存問題
  css: {
    extract: {// 輸出編譯後的文件名稱：【文件名稱.版本號.時間戳】
      filename: `css/[name].[chunkhash].${version}.css`,   
      chunkFilename: `css/[name].[chunkhash].${version}.css`
    }
  },

  //壓縮圖片
  // chainWebpack: config => { 
  //   IN_PRODUCTION && config.module
  //   // config.module
  //     .rule("images")
  //     .test(/\.(png|jpe?g|gif)(\?.*)?$/)
  //     .use("image-webpack-loader")
  //     .loader("image-webpack-loader")
  //     .options({
  //       mozjpeg: {
  //         progressive: true,
  //         quality: 65
  //       },
  //       optipng: {
  //         enabled: false
  //       },
  //       pngquant: {
  //         quality: [0.65, 0.9],
  //         speed: 4
  //       },
  //       gifsicle: {
  //         interlaced: false
  //       },
  //     })
  //     .end();
  // },

  //关闭eslint检查
  lintOnSave: false, 

  //開發環境時使用 HTTPS
  devServer: {
    https: true, 
  },
  publicPath: './'
})