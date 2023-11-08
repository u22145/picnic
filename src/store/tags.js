import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTags: {
      "formPage": '7B4BB5430B57449FB7C8AD92BB94AC7C',//23春風週LIFF_發票登錄
      "friendPage": '7312DD2792D04452A8D950D6E07B033A',//23春風週LIFF_邀請好友
    },
    indexTags: {
      "formPage": '7B4BB5430B57449FB7C8AD92BB94AC7C',//23春風週LIFF_發票登錄
      "friendPage": '7312DD2792D04452A8D950D6E07B033A',//23春風週LIFF_邀請好友
    },
    friendTags: {
      "shareMsg": "7312DD2792D04452A8D950D6E07B033A",//23春風週LIFF_邀請好友
    },
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})