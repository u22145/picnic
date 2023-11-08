import axios from "axios";
let Myplugin = {};
Myplugin.install = function (Vue, options) {

  // API網址
  Vue.prototype.$apiUrl = process.env.VUE_APP_APIUrl;
  // LIFF ID
  Vue.prototype.$liffId = process.env.VUE_APP_liffId;
  // LIFF URL
  Vue.prototype.$liffUrl = process.env.VUE_APP_liffUrl;
  // 官方帳號好友
  Vue.prototype.$lineFriends = process.env.VUE_APP_lineFriends;

  // Line AccessToken 設定
  Vue.prototype.$SetAccessToken = function (token) {
    Vue.prototype.$accessToken = token;
  }
  // 愛酷貼標
  Vue.prototype.$addTags = function (tag, methodName, methodData, page) {
    var me = this;
    var config = {
      method: "post",
      url: me.$apiUrl + "/API/AddData_AddAccuNixTags/BFC9A6F2543142C3BA0841DCEB074856",
      headers: {
        "Authorization": `Bearer ${me.$accessToken}`,
      },
      data: new FormData()
    }
    config.data.append('tag', tag);

    axios(config).then(res => {}).catch((error) => {});

    if (methodName) {
      me.$childMethod.$emit(methodName, methodData);
    }
    // 執行SPA相關動作
    if (page) {
      var path = page.path;
      var query = page.query;
      if (path) {
        if (query) {
          this.$router.push({
            path: path,
            query: query
          }).catch(error => {
            if (error.name !== 'NavigationDuplicated' && !error.message.includes(
                'Avoided redundant navigation to current location')) {
              console.log(error)
            };
          });
        } else {
          this.$router.push({
            path: path
          });
        }
      }
    }
  }

  // hash換頁錨點功能
  Vue.prototype.$urlHash = function (getHash) {
    setTimeout(function(){
      let element = document.getElementById(getHash)
      element.scrollIntoView({
        behavior: "smooth",
        // inline: "start" 水平軸
      });
    },100)
  }
}

export default Myplugin