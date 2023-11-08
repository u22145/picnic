<template>
  <div class="HomePage">
    <div class="index0box">
      <div class="masterVision">
        <v-img class="f0" contain :eager="true" src="../assets/img/index/flower/f0.png" width="30%" />
        <v-img v-rellax="{ speed: -3 }" contain :eager="true" src="../assets/img/index/flower/f1.png" width="15%" />
        <v-img class="logoTitle" v-rellax="{ speed: 2 }" contain :eager="true" src="../assets/img/index/logo.png"
          width="100%" />
        <div class="lImg imgBox">
          <v-img @load="$emit('getLoading', false)" v-rellax="{ speed: 2 }" contain :eager="true"
            src="../assets/img/index/flower/masterLc.png" width="100%" />
          <v-img v-rellax="{ speed: -2 }" contain :eager="true" src="../assets/img/index/flower/masterLf.png"
            width="80%" />
        </div>
        <div class="rImg imgBox">
          <v-img v-rellax="{ speed: 1 }" contain :eager="true" src="../assets/img/index/flower/masterRc.png"
            width="60%" />
          <v-img v-rellax="{ speed: -1 }" contain :eager="true" src="../assets/img/index/flower/masterRf.png"
            width="90%" />
        </div>
        <v-img contain :eager="true" src="../assets/img/index/grass.png" width="100%" />
      </div>
      <div class="linkBox">
        <v-img contain :eager="true" src="../assets/img/index/cat.png" width="95%" />
        <div style="width: 80%;">
          <a v-if="dateLine27" href="javascript:void(0)" class="d-flex" @click="
              $addTags(indexTags.formPage, null, null, { path: '/fromPage' })
            ">
            <v-img contain :eager="true" class="justify-center" src="../assets/img/index/btnBill.png" width="80%" />
          </a>
          <p v-else class="endBtn">本次活動已結束<br>感謝您的熱情參與！</p>
          <a v-if="dateLine20" href="javascript:void(0)" class="d-flex" @click="
              $addTags(indexTags.friendPage, null, null, {
                path: '/friendPage',
              })
            ">
            <v-img contain :eager="true" class="justify-center" src="../assets/img/index/btnFriend.png" width="80%" />
          </a>
        </div>
      </div>
    </div>
    <img id="three" src="@/assets/img/index/index1.jpg" width="100%" />
    <div class="prizeBox" id="prize">
      <img src="@/assets/img/index/index2.png" width="80%" />
      <v-img class="cloud" v-rellax="{ speed: 4 }" contain :eager="true" src="../assets/img/index/index2cloud.png"
        width="70%" />
      <v-img class="cloud1" v-rellax="{ speed: 2 }" contain :eager="true" src="../assets/img/index/index2cloud.png"
        width="70%" />
    </div>
    <img id="gift" src="@/assets/img/index/index3.jpg" />
    <img src="@/assets/img/index/index4.jpg" width="100%" />
    <img v-if="dateLine04" id="winning" src="@/assets/img/index/index51.jpg" />
    <router-link v-else  to="/winnerPage" id="winning" style="display: block;margin: -7px;"
      @click.native="$addTags(tags.formPage, null, null, null)">
      <img id="winning" src="@/assets/img/index/index5.jpg" width="100%" />
    </router-link>
    <div class="illustrateBox" id="illustrate">
      <img src="@/assets/img/index/index6.png" width="100%" />
      <a class="img2" href="https://www.facebook.com/andante.clc/" target="_blank">
        <img src="@/assets/img/index/index7.png" width="100%" /></a>
      <a class="img3" href="https://line.me/ti/p/@271fwspr" target="_blank">
        <img src="@/assets/img/index/index8.png" width="100%" /></a>
      <img class="img4" src="@/assets/img/index/index9.png" width="100%" />
    </div>
  </div>
</template>

<script>
  import store from "../store/tags";
  import liff from "@line/liff";
  import swal from "sweetalert2";
  import sakura from '../lib/sakura'
  export default {
    name: "HomePage",
    data() {
      return {
        dateLine20: new Date() < new Date("2023/04/20,23:59:59"), //活動結束時間
        dateLine27: new Date() < new Date("2023/04/27,23:59:59"), //活動結束時間
        dateLine04: new Date() < new Date("2023/05/04,16:00:00"), //得獎名單公佈
      };
    },
    components: {},
    computed: {
      indexTags() {
        //愛酷標籤
        return store.state.indexTags;
      },
    },
    mounted() {
      sakura()
    },
    methods: {
      // 顯示popup視窗
      seePopUp(val) {
        this.dialog = true;
        this.popupIconType = "icon" + val;
        this.popupItem = val;
      },
      qrdoceTxt() {
        liff
          .scanCodeV2()
          .then((result) => {
            swal.fire({
              text: JSON.stringify(result),
              allowOutsideClick: false,
            });
            // alert(result)
          })
          .catch((error) => {
            console.log("error", error);
          });
      },
    },
  };
</script>
<style lang="scss">
  .HomePage {
    position: relative;
    .masterVision {
      display: flex;
      flex-wrap: wrap;
    }

    .f0 .v-image__image {
      background-position: center top !important;
    }

    .imgBox {
      width: 50%;
      position: relative;
      height: 0;
      z-index: 0;

      .v-image {
        position: absolute;
        bottom: 0;
      }

      &.lImg {
        bottom: -110px;

        .v-image {
          left: 0;
        }
      }

      &.rImg {
        bottom: -52px;

        .v-image {
          right: 0;
        }
      }
    }

    .endBtn {
      background-color: #B56D21;
      border-radius: 40px;
      padding: 8px;
      text-align: center;
      color: #ffffff;
      font-weight: 700;
      letter-spacing: 2px;
      font-size: 20px;
      margin: 40px 0;
    }

    >img {
      width: 100%;
      margin-top: -7px;
    }

    .catBox {
      position: relative;
      height: 220px;
      width: 100%;

      &>.v-image {
        position: absolute;

        &.picnicMat {
          left: 0px;
          top: 0px;
        }

        &.cat {
          right: 24%;
          top: -110px;
        }

        &.sandwich {
          left: 220px;
          top: 90px;
        }

        &.orange1 {
          right: 29%;
          top: 125px;
        }

        &.orange2 {
          right: 12%;
          top: 149px;
        }

        &.toiletPaper {
          top: 0px;
          left: 25%;
        }

        &.meal {
          top: 50px;
          left: 20%;
        }

        &.group {
          right: 14%;
          top: 65px;
        }
      }
    }

    .index0box {
      position: relative;

      img {
        width: 100%;
      }

      .logoTitle {
        position: relative;
        top: -90px;
      }

      .linkBox {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: -120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        a {
          width: 100%;
        }
      }
    }

    // 花見生活禮
    .prizeBox {
      position: relative;
      width: 100%;
      text-align: center;
      padding-top: 60px;

      >img {
        position: relative;
        width: 90%;
        z-index: 2;
      }

      .cloud,
      .cloud1 {
        position: absolute;
        z-index: 1;
      }

      .cloud {
        bottom: 80px;
      }

      .cloud1 {
        bottom: -350px;
        right: -200px;
      }
    }

    //活動
    .illustrateBox {
      position: relative;
      top: -10px;
      background-color: #ffffff;

      img {
        width: 100%;
      }
    }
  }

  @media (max-width:500px) {
    .HomePage .catBox {
      height: 160px;
    }
  }

  @media (max-width:430px) {
    .HomePage .index0box .linkBox {
      bottom: -70px;
    }

    .HomePage .catBox {
      height: 125px;
    }
  }
</style>