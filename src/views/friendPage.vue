<template>
  <div class="friendPage animate__animated animate__fadeInUp animate__slow">
    <div class="txtBox" v-if="!shareFinish">
      <!-- 邀請好友 -->
      <img
        src="@/assets/img/friend/txt0.jpg"
        @load="$emit('getLoading', false)"
      />
      <img
        src="../assets/img/friend/txt1.png"
        @click="
          shareMsg();
          $addTags(friendTags.shareMsg, null, null, null);
        "
      />
    </div>
    <div class="txtBox" v-else>
      <!-- 已經邀請好友 -->
      <img
        src="../assets/img/friend/txt2.jpg"
        @load="$emit('getLoading', false)"
      />
      <img
        src="../assets/img/friend/goHome.png"
        @click="$addTags(friendTags.goHome, null, null, { path: '/' })"
      />
      <!--<router-link to="/fromPage"><img src="../assets/img/friend/goHome.png"></router-link>-->
    </div>
    <popup
      :popupIconType="popupIconType"
      :popupItem="popupItem"
      :prize="prize"
      :canSendTime="canSendTime"
      v-if="dialog"
      @popupStatus="(dialog = false), (shareFinish = true)"
      @changeAeMember="changeAeMember"
    />
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import liff from "@line/liff";
import popup from "../components/popup";
import store from "../store/tags";
export default {
  name: "friendPage",
  components: {
    popup,
  },
  props: ["userInfo",'setShareFinishType'],
  data() {
    return {
      dialog: false,
      popupIconType: "",
      popupItem: "",
      prize: "",
      shareFinish: false,
      canSendTime: "",
      shareMsgSuccess: false,
    };
  },
  computed: {
    friendTags() {
      //愛酷標籤
      return store.state.friendTags;
    },
  },
  methods: {
    // 邀請line好友
    shareMsg() {
      var me = this;
      const oaUrl = me.$liffUrl + '?v='+new Date().getTime();
      if (!liff.isApiAvailable("shareTargetPicker")) {
        swal.fire({
          icon: "error",
          title: "您的Line版本不支援此功能",
          text: "請嘗試更新Line app後，再次使用此功能",
        });
      } else {
        // swal.fire({
        //   allowOutsideClick: false,
        // });
        // swal.showLoading();
        liff
          .shareTargetPicker([
            {
              type: "text",
              text: "現在加入並成功邀請好友最高可抽LINE POINTS 80點🥰🥰\n\n【🌸花見好生活 春風貓陪你野餐賞櫻趣🐱】\n 📆 即日起至2023/04/20止\n📍邀請好友加入春風，每成功邀請1位送10點LINE POINTS，最高30點~（每人限領一次，共400名）\n 📍成功邀請3位，加碼抽50點！（共80名）\n\n 🛒活動期間內，單筆購買春風全系列商品滿168元，再抽iPad等多項好禮！\n\n👇點擊下方圖片立即加入👇",
              wrap: true,
            },
            {
              type: "flex",
              altText:
                "春風貓好好生活節，現在加入並成功邀請好友，送免費LINE POINTS",
              contents: {
                type: "bubble",
                size: "giga",
                hero: {
                  type: "image",
                  url: me.$apiUrl + "/sharing1.jpg?v="+new Date().getTime(),
                  size: "full",
                  aspectRatio: "1:1",
                  aspectMode: "cover",
                  action: {
                    type: "uri",
                    uri: `${oaUrl}?inviteCode=${this.userInfo.inviteCode}#`,
                  },
                },
              },
            },
          ])
          .then(function (res) {
            if (res) {
              // succeeded in sending a message through TargetPicker
              // console.log(`[${res.status}] Message sent!`)
              me.shareMsgSuccess = true;
            } else {
              const [majorVer, minorVer] = (liff.getLineVersion() || "").split(
                "."
              );
              if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) {
                // LINE 10.3.0 - 10.10.0
                // Old LINE will access here regardless of user's action
                // TargetPicker 至少已打開。是否成功發送消息不清楚
                me.shareMsgSuccess = true;
              } else {
                // LINE 10.11.0 -
                // sending message canceled
                // console.log('TargetPicker was closed!')
                // 取消分享
                me.shareMsgSuccess = false;
              }
            }

            if (me.shareMsgSuccess) {
              // 已成功分享好友訊息
              me.shareFinish = true;
              // this.$emit('shareFinishType', this.shareFinish)
            } else {
              // user取消分享
              // alert("")
            }
          })
          .catch(function (error) {
            // something went wrong before sending a message
            console.log(error);
            alert("系統忙碌中，請稍後再試 !!");
          })
          .finally(() => {
            // swal.close();
          });
      }
    },
    // 取得驗證碼的倒數秒數
    getCanSendTime() {
      var me = this;
      me.url = "/Liff/GetData_SmsCanSendTime/54CF6E71502D44198838C6C21DA43F0A";
      var config = {
        method: "get",
        headers: {
          Authorization: `Bearer ${me.$accessToken}`,
        },
        url: me.$apiUrl + me.url,
      };
      swal.fire({
        didOpen: () => {
          swal.fire({
            allowOutsideClick: false,
          });
          swal.showLoading();
          axios(config)
            .then((res) => {
              var data = res.data;
              if (data && data.success) {
                // 剩餘秒數
                me.canSendTime = data.data;
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
      });
    },
    seePopUp(val) {
      this.dialog = true;
      this.popupIconType = "icon" + val;
      this.popupItem = val;
    },
    changeAeMember() {
      this.$emit("changeAeMember", true);
    },
  },
};
</script>
<style lang="scss">
.friendPage {
  min-height: calc(100vh - 56px);
  background-size: cover;
  background-position: center;
  background-image: url(../assets/img/friend/bg.jpg);
  display: flex;

  .txtBox {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    img {
      &:nth-child(-n + 2) {
        width: 100%;
      }
    }
  }
}
</style>