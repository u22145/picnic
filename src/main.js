import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from "axios";
import 'animate.css';//載入動畫
import VueRellax from 'vue-rellax'//滾動式差
import VueLuckyCanvas from '@lucky-canvas/vue'//抽獎
import MyPlugin from './lib/Myplugin'
import store from './store'//靜態資料
import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';
liff.use(new LiffMockPlugin());

Vue.config.productionTip = false
Vue.use(MyPlugin)
Vue.use(VueRellax)
Vue.use(VueLuckyCanvas)
router.afterEach(() => {
  //只要換頁都從頂端開始
	window.scrollTo(0, 0);
});
new Vue({
  router,
  vuetify, 
  store,
  VueLuckyCanvas,
  axios,
  VueRellax,
  render: h => h(App)
}).$mount('#app')
