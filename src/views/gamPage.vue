'<template>
  <div class="gamPageBox">
    <div class="gamPage">
      <v-img class="title animate__animated animate__fadeInUp animate__slow" contain :eager=true
        src="../assets/img/gam/title.png" width="100%" @load="$emit('getLoading', false)" />
      <div class="gamBox animate__animated animate__fadeInUp animate__slow">
        <LuckyGrid class="canvasItem" ref="myLucky" width="19rem" height="19rem" :blocks="blocks" :prizes="prizes"
          :buttons="buttons" @start="startCallback" @end="endCallback" />
        <v-img v-if="clickFinger" class="finger" contain :eager=true src="../assets/img/gam/finger.png" width="10%" />
      </div>
      <popup :popupIconType="popupIconType" :popupItem="popupItem" :index="index" :name="name" :prize="prize"
        v-if="dialog" @popupStatus="dialog=false" />
    </div>
  </div>

</template>

<script>
  import axios from "axios";
  import swal from 'sweetalert2'
  import popup from '../components/popup'
  import store from '../store/tags';
  import gam from '../store/gam';
  export default {
    name: 'gamPage',
    props: ['inv_index', 'inv_prize', 'inv_name'],
    components: {
      popup,
    },
    data() {
      return {
        index: 0, //九宮格位置
        prize: null, //獎品10點 30點 50點 null
        name: '', //得獎內容
        defaultConfig: {
          gutter: '10px'
        },
        clickFinger: true,
        round: true,
        dialog: false,
        popupIconType: '',
        popupItem: '',
        number: "",
      }
    },
    computed: {
      gamTags() { //愛酷標籤
        return store.state.gamTags
      },
      blocks() { //邊框設定
        return gam.state.blocks
      },
      prizes() { //轉盤圖片設定
        return gam.state.prizes
      },
      buttons() { //轉盤開始按鈕設定
        return gam.state.buttons
      },
      attractions() { //轉盤開始按鈕設定
        return gam.state.attractions
      }
    },
    mounted() {
      // 從選單點選遊戲
      this.prize = this.inv_prize
      this.name = this.inv_name
      this.index = this.inv_index
      if (this.inv_name != '' && this.inv_prize != null) {
        this.seePopUp('Winning')
      }
      if (this.inv_prize == null) {
        this.seePopUp('Thanks')
      }
    },
    methods: {
      // 顯示popup視窗
      seePopUp(val) {
        this.dialog = true
        this.popupIconType = 'icon' + val
        this.popupItem = val
      },
      // 点击抽奖按钮会触发star回调
      startCallback() {
        this.clickFinger = false
        this.getPrize()
        // 调用抽奖组件的play方法开始游戏
        this.$refs.myLucky.play()
        // 模拟调用接口异步抽奖
        setTimeout(() => {
          const index = this.index
          // 调用stop停止旋转并传递中奖索引
          this.$refs.myLucky.stop(index)
          this.endCallback()
          //顯示得獎訊息彈窗
          this.showPrize()
        }, 3000)
      },
      // 抽奖结束会触发end回调
      endCallback(prize) {
        console.log(prize)

      },
      // 獲得獎項
      getPrize() {
        var me = this;
        me.url = '/API/GetData_DrawPrize/8635309EEF564474B11CAEB66F3E5501'
        var config = {
          method: "post",
          headers: {
            Authorization: `Bearer ${me.$accessToken}`,
          },
          url: me.$apiUrl + me.url,
        }
        axios(config).then(res => {
          var data = res.data;
          if (data && data.success) {
            console.log('data.data', data.data)
            this.prize = data.data.prize
            this.name = data.data.name
            this.index = data.data.index

          }
        }).catch((err) => {
          console.log(err)
          alert("系統忙碌中，請稍後再試");
        }).finally(() => {
          // swal.close();
        })
      },
      // 顯示得獎訊息彈窗
      showPrize() {
        if (this.prize == null) {
          this.round = false
          setTimeout(() => {
            // 過2秒顯示銘謝惠顧
            this.seePopUp('Thanks')
            this.round = true
          }, 2000);
        } else {
          this.round = false
          setTimeout(() => {
            // 過2秒顯示得獎資訊
            this.seePopUp('Winning')
            this.round = true
          }, 2000);
        }
      },

    }
  }
</script>
<style lang="scss">
  .gamPageBox {
    width: 100%;
    min-height: calc(100vh - 56px);
    background-image: url(../assets/img/friend/bg.jpg);
    background-position: left bottom;
    background-size: 100%;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      background-image: url(../assets/img/gam/f1.png);
      width: 216px;
      height: 163px;
    }

  }

  .gamPage {
    width: 100%;
    height: 623px;
    background: -moz-linear-gradient(top, rgba(200, 231, 237, 1) 90%, rgba(125, 185, 232, 0)95%, rgba(125, 185, 232, 0) 100%);
    background: -webkit-linear-gradient(top, rgba(200, 231, 237, 1) 90%, rgba(125, 185, 232, 0) 95%, rgba(125, 185, 232, 0) 100%);
    background: linear-gradient(to bottom, rgba(200, 231, 237, 1) 90%, rgba(125, 185, 232, 0)95%, rgba(125, 185, 232, 0) 100%);
    position: relative;

    &::after,
    &::before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      background-size: cover;
    }

    &::after {
      background-image: url(../assets/img/gam/cat.png);
      width: 136px;
      height: 163px;
    }

    &::before {
      background-image: url(../assets/img/gam/gamBG.png);
      width: 100%;
      height: 27vh;
      background-repeat: no-repeat;
      background-position: left bottom;
      background-size: 100% auto;
    }

    img {
      width: 100%;
    }

    .gamBox {
      display: flex;
      flex-wrap: wrap;
      width: 85%;
      justify-content: center;
      position: relative;
      top: -20px;
      margin: 0 auto;

      .canvasItem {
        transform: scale(1.2);
        border-radius: 15px;
        box-shadow: 5px 5px 0px 0px #b56d21;

        &:hover {
          cursor: pointer;
        }
      }

      canvas {
        border-radius: 15px;
      }

      .finger {
        transform: rotateZ(-45deg);
        position: absolute;
        animation: goFinger 3s infinite alternate;
      }

      button {
        position: relative;
        top: -90px;
      }
    }
  }

  @keyframes goFinger {
    0% {
      right: 140px;
      bottom: 90px;
    }

    50% {
      right: 170px;
      bottom: 120px;
    }

    100% {
      right: 140px;
      bottom: 90px;
    }
  }

  @media (max-width:450px) {
    .gamPage .gamBox .canvasItem {
      transform: scale(1);
    }

    @keyframes goFinger {
      0% {
        right: 90px;
        bottom: 90px;
      }

      50% {
        right: 120px;
        bottom: 120px;
      }

      100% {
        right: 90px;
        bottom: 90px;
      }
    }
  }
</style>'