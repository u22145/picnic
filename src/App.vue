<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <router-link to="/" id="logo">
          <v-img alt="Logo" class="shrink mr-2" contain src="./assets/img/logo.png" transition="scale-transition"
            width="70" />
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-img @click="
          showMenu = true;
          $addTags(appTags.Menu, null, null, null);
        " class="shrink ml-2" contain src="./assets/img/menu.png" width="40" />
    </v-app-bar>
    <v-main>
      <router-view :userInfo="userInfo" :inv_name="inv_name" :inv_index="inv_index" :inv_prize="inv_prize"
        :loading="loading" @changeAeMember="changeAeMember" @getLoading="getLoading" @shareFinishType='shareFinishType' />
    </v-main>

    <div class="nav animate__animated animate__fadeIn" v-if="showMenu" @click="showMenu = false">
      <v-img class="shrink ml-2" contain src="./assets/img/menuX.png" width="40" />
      <router-link v-if="dateLine27" to="/fromPage" @click.native="$addTags(appTags.formPage, null, null, null)">發票登錄</router-link>
      <router-link v-if="dateLine20" to="/friendPage" @click.native="$addTags(appTags.friendPage, null, null, null)">邀請LINE好友
      </router-link>
      <router-link to="/" @click.native="$addTags(appTags.prize, null, null, null), $urlHash('three')">春風貓三重好禮
      </router-link>
      <router-link class="small" to="/" @click.native="$addTags(appTags.prize, null, null, null), $urlHash('prize')">
        花見生活禮</router-link>
      <a v-if="dateLine27" href="javascript:void(0)" class="small"
        @click="getIsDraw(), $addTags(appTags.gamPage, null, null, null)">賞花地圖抽LINE POINTS</a>
      <router-link class="small" to="/" @click.native="$addTags(appTags.gift, null, null, null), $urlHash('gift')">
        指定通路禮</router-link>
      <router-link to="/attractionsPage" @click.native="$addTags(appTags.attractionsPage, null, null, null)">春風貓賞花踩點攻略
      </router-link>
      <!-- <router-link
        to="/winnerPage"
        @click.native="$addTags(appTags.winning, null, null, null)"
        >中獎名單</router-link
      > -->
      <router-link to="/" @click.native="$addTags(appTags.winning, null, null, null), $urlHash('winning')">中獎名單
      </router-link>
      <router-link to="/" @click.native="$addTags(appTags.illustrate, null, null, null), $urlHash('illustrate')">活動辦法
      </router-link>
    </div>
    <footer>
      <br />2023 正隆股份有限公司 © All Rights Reserved.<br />
      This site is protected by reCAPTCHA and the Google <br /><a href="https://policies.google.com/privacy">Privacy
        Policy</a>
      and
      <a href="https://policies.google.com/terms">Terms of Service</a>
      apply.<br />
    </footer>
    <popup :popupIconType="popupIconType" :popupItem="popupItem" :sellerName="sellerName" v-if="dialog"
      @popupStatus="dialog = false" />
    <div v-if="loading" class="loading">
      <span class="loader"></span>
      <div class="letter-holder">
        <span class="l-1 letter">L</span>
        <span class="l-2 letter">o</span>
        <span class="l-3 letter">a</span>
        <span class="l-4 letter">d</span>
        <span class="l-5 letter">i</span>
        <span class="l-6 letter">n</span>
        <span class="l-7 letter">g</span>
        <span class="l-8 letter">.</span>
        <span class="l-9 letter">.</span>
        <span class="l-10 letter">.</span>
      </div>
    </div>
  </v-app>
</template>

<script>
  import axios from "axios";
  import liff from "@line/liff";
  import swal from "sweetalert2";
  import popup from "./components/popup";
  import store from "./store/tags";
  // import { fail } from "assert";
  // import {getSellerInvoiceVerifyResult} from './api/app';
  export default {
    name: "App",
    components: {
      popup,
    },
    data: () => ({
      loading: true,
      dateLine20: new Date() < new Date("3323/04/20,23:59:59"), //活動結束時間
      dateLine27: new Date() < new Date("3323/04/27,23:59:59"), //活動結束時間
      dialog: false,
      showPopup: false,
      popupIconType: "Bill",
      popupItem: "Bill",
      inv_index: "", ////九宮格位置
      inv_prize: "", //獎品10點 30點 50點 null
      inv_name: "", //得獎內容
      // inv_playGame: true, //是否玩過遊戲
      showMenu: false,
      sellerName: [], //查詢指定通路發票
      audit: false, //指定通路發票審核
      userInfo: [], //取得使用者inviteCode:邀請碼、isAeMember:是否是會員、isDraw：是否玩輪盤、isInvoiceEnrollment:是否登入發票
      lineProfile: "", //取得user資訊
    }),
    computed: {
      appTags() {
        //愛酷標籤
        return store.state.appTags;
      },
    },
    mounted() {
      let _this = this;
      liff.init({
        // liffId: _this.liffId,
        liffId: _this.$liffId,
        withLoginOnExternalBrowser: true
      }).then(() => {
        //確認登入狀態
        if (!liff.isLoggedIn()) {
          //執行登入
          console.log(location.href)
          liff.login({
            redirectUri: location.href
          });
        } else {
          // 新增邀請紀錄
          // _this.addInvitationRecord()
          //取得Line Token
          _this.$SetAccessToken(liff.getAccessToken());
          // User資訊
          _this.getUserInfo()
          //確認好友狀態
          liff.getFriendship().then(async (data) => {
            if (!data.friendFlag) {
              swal.fire({
                text: '請加入春風官方帳號好友',
                allowOutsideClick: false
              }).then(() => {
                // 判斷是否是開發環境
                window.location.href = _this.$lineFriends;
              })
              // _this.showPopup = true
              // 做一個popup，有顆按鈕可以導到加好友畫面
            } else {
              try {
                //取得user資訊
                _this.lineProfile = await liff.getProfile();
              } catch (error) {
                alert('忙碌中，請稍後再試');
                console.error(error);
              }
            }
          })
        }
      });
      window.addEventListener("resize", this.renderResize, true);
    },
    beforeDestroy() {
      // 移除 監聽
      window.addEventListener("resize", this.renderResize, false);
    },
    methods: {
      // 禁止手機橫拿
      renderResize() {
        if (window.orientation == 180 || window.orientation == 0) {
          this.showPopup = false
        }
        if (window.orientation == 90 || window.orientation == -90) {
          this.showPopup = true
        }
      },
      getLoading(val) {
        this.loading = val;
      },
      //使用者發票驗證結果
      getSellerInvoiceVerifyResult() {
        var me = this;
        var config = {
          method: "get",
          headers: {
            Authorization: `Bearer ${me.$accessToken}`,
          },
          url: me.$apiUrl +
            "/liff/GetDataTable_SellerInvoiceVerifyResult/7978B4EB00EB4F77998CA206E06E5A5C",
        };
        // swal.fire({
        //   allowOutsideClick: false,
        // });
        // swal.showLoading();
        axios(config)
          .then((res) => {
            var data = res.data;
            if (data && data.success) {
              me.sellerName = data.data ? JSON.parse(data.data) : [];
              me.seePopUp("Bill");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("系統忙碌中，請稍後再試");
          })
          .finally(() => {
            // swal.close();
          });
      },
      // 顯示popup視窗
      seePopUp(val) {
        this.dialog = true;
        this.popupIconType = "icon" + val;
        this.popupItem = val;
      },
      //獲得使用者是否需要玩遊戲的資訊
      getIsDraw() {
        let me = this;
        var config = {
          method: "get",
          headers: {
            Authorization: `Bearer ${me.$accessToken}`,
          },
          url: me.$apiUrl +
            "/API/GetData_LatestInvoice/A2215DDFC6D841D894DF0AC91697364D",
        };
        // swal.fire({
        //   allowOutsideClick: false,
        // });
        // swal.showLoading();
        axios(config)
          .then((res) => {
            var data = res.data;

            if (data && data.success) {
              if (data.data != null) {
                // 玩過遊戲
                console.log('data.data.index', data.data.index)
                me.inv_index = data.data.index;
                me.inv_prize = data.data.prize;
                me.inv_name = data.data.name;
                me.$router.push({
                  name: "gamPage",
                  params: {
                    inv_index: me.inv_index,
                    inv_prize: me.inv_prize,
                    inv_name: me.inv_name,
                  },
                });
              } else {
                me.$router.push({
                  name: "gamPage",
                });
              }
            } else {
              swal.fire({
                icon: "error",
                title:data.message,
                // text: "請嘗試更新Line app後，再次使用此功能",
              }).then(() => {
                me.$router.push({
                name: "fromPage",
              });
              });
              // alert(data.message);
              // 登入發票
              // me.$router.push({
              //   name: "fromPage",
              // });
            }
          })
          .catch((err) => {
            console.log(err);
            alert("系統忙碌中，請稍後再試");
          })
          .finally(() => {
            // swal.close();
          });
      },
      // 在line liff裡開網頁
      goAeSHOP() {
        liff.openWindow({
          url: "https://pse.is/4f5ggc",
          external: false,
        });
      },
      //取得使用者inviteCode:邀請碼、isAeMember:是否是會員、isDraw：是否玩輪盤、isInvoiceEnrollment:是否登入發票
      getUserInfo() {
        var me = this;
        var config = {
          method: "post",
          headers: {
            Authorization: `Bearer ${me.$accessToken}`,
          },
          url: me.$apiUrl +
            "/API/GetData_GetUserInfo/A222F382F75747AC9441E37081AF7A1F",
          data: new FormData(),
        };
        var url = new URL(location.href);
        // invitation_code 邀請碼
        var inviteCode = new URLSearchParams(url.search).get("inviteCode")
        if(inviteCode){
          config.data.append("invitation_code",inviteCode);
        }
        
        // swal.fire({
        //   allowOutsideClick: false,
        // });
        // swal.showLoading();
        axios(config)
          .then((res) => {
            var data = res.data;
            if (data && data.success) {
              this.userInfo = data.data;
            } else {
              alert(data.message);
            }
          })
          .catch((err) => {
            console.log(err);
            alert("系統忙碌中，請稍後再試");
          })
          .finally(() => {
            swal.close();
          });
      },
      changeAeMember(val) {
        this.$set(this.userInfo, "isAeMember", val);
      },
    },
  };
</script>
<style lang="scss">
  #app {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    background-color: #c8e7ed;

    footer {
      color: #000000;
      font-size: 12px;
      text-align: center;
      padding-bottom: 10px;
    }

    .nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 5;
      background-color: #c8e7ed;
      width: 100vw;
      height: 100vh;
      // background-image: url(./assets/img/nav/grass.png);
      background-position: left bottom;
      background-repeat: no-repeat;
      background-size: 100% 20%;

      .v-image {
        position: absolute;
        right: 16px;
        top: 8px;
      }

      a {
        display: block;
        line-height: 2.4;
        color: #000000;
        font-weight: 700;
        font-size: 24px;
        text-decoration: none;
        width: 270px;
        text-align: center;

        &.small {
          font-size: 22px;
          top: -8px;
          line-height: 2;
          font-weight: 500;

          &::before {
            opacity: 0;
          }
        }

        &+a {
          position: relative;

          &::before {
            position: absolute;
            left: 0;
            top: 0;
            content: "";
            display: block;
            width: 100%;
            height: 3px;
            background-image: url(./assets/img/line.svg);
            background-repeat: repeat-x;
          }
        }
      }
    }

    .v-btn {
      margin: auto;

      &:not(.v-btn--round).v-size--default {
        height: auto;
      }

      &:before {
        background-color: rgb(245 245 245 / 0%) !important;
      }
    }

    .v-btn--is-elevated,
    .v-btn--is-elevated:active {
      box-shadow: none;
    }

    .loading {
      z-index: 10;
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      width: 100vw;
      background-color: #c8e7ed;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .loader {
        width: 48px;
        height: 48px;
        display: inline-block;
        position: relative;
        margin-bottom: 20px;

        &::after,
        &::before {
          content: "";
          box-sizing: border-box;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(57, 98, 106, 1);
          position: absolute;
          left: 0;
          top: 0;
          animation: animloader 2s linear infinite;
        }

        &::after {
          animation-delay: 1s;
        }
      }

      @keyframes animloader {
        0% {
          transform: scale(0);
          opacity: 1;
        }

        100% {
          transform: scale(1);
          opacity: 0;
        }
      }

      .letter-holder .letter {
        font-size: 18px;
        margin-left: 4px;
        color: rgba(57, 98, 106, 1);
        animation-name: loadingF;
        animation-duration: 1.6s;
        animation-iteration-count: infinite;
        animation-direction: linear;

        @for $i from 1 through 10 {
          &.l-#{$i} {
            animation-delay: 0.48 + $i * 0.12s;
          }
        }
      }

      @keyframes loadingF {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }
    }
  }
</style>