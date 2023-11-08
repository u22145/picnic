import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 城市list
    cityItems: ['基隆市', '台北市', '新北市', '桃園市', '新竹縣', '新竹市', '苗栗縣', '台中市', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '嘉義市',
      '台南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣',
    ],
    
    //購買品項
    buyItem: [{
        "text": "春風抽取式/捲筒式衛生紙",
        "value": "春風抽取式和捲筒式"
      },
      {
        "text": "春風1秒抽廚紙/春風捲筒廚紙",
        "value": "春風1秒抽和捲筒廚紙"
      },
      {
        "text": "寶島春風 系列",
        "value": "寶島春風"
      },
      {
        "text": "Andante 洗沐系列",
        "value": "Andante洗沐"
      },
      {
        "text": "其他春風商品",
        "value": "其他春風"
      }
    ],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
