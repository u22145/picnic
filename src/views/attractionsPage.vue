<template>
  <div
    class="attractionsPage animate__animated animate__fadeInUp animate__slow"
  >
    <v-img
      class="f1 flower"
      v-rellax="{ speed: -8 }"
      contain
      :eager="true"
      src="../assets/img/attractions/f1.png"
      width="40%"
    />
    <v-img
      class="f2 flower"
      v-rellax="{ speed: -5 }"
      contain
      :eager="true"
      src="../assets/img/attractions/f2.png"
      width="40%"
    />
    <div class="imgBox" v-for="item in list" :key="item">
      <a href="javascript:void(0)" @click.prevent="openWindow(item.link)">
        <img @load="$emit('getLoading', false)"
          class="title" :src="item.imgUrl"  width="100%">
        <!-- <v-img
          @load="$emit('getLoading', false)"
          class="title"
          contain
          :eager="true"
          :src="item.imgUrl"
          width="100%"
        /> -->
      </a>
    </div>
    <v-img
      class="f3 flower"
      v-rellax="{ speed: -1 }"
      contain
      :eager="true"
      src="../assets/img/attractions/f3.png"
      width="40%"
    />
  </div>
</template>

<script>
import liff from "@line/liff";
export default {
  name: "attractionsPage",
  components: {},
  data() {
    return {
      list: [
        {
          //武陵農場
          imgUrl: require("@/assets/img/attractions/img1.jpg"),
          link: "https://www.wuling-farm.com.tw/tw/index.php",
        },
        {
          //天元宮
          imgUrl: require("@/assets/img/attractions/img2.jpg"),
          link: "https://www.facebook.com/88tyk",
        },
        {
          //南投日月潭
          imgUrl: require("@/assets/img/attractions/img3.jpg"),
          link: "https://www.facebook.com/sunmoonteafarm",
        },
        {
          //陽明山二子坪

          imgUrl: require("@/assets/img/attractions/img4.jpg"),
          link: "https://www.ymsnp.gov.tw/main_ch/index.aspx",
        },
        {
          //阿里山
          imgUrl: require("@/assets/img/attractions/img5.jpg"),
          link: "https://www.ali-nsa.net/",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    // 在line liff裡開網頁
    openWindow(val) {
      liff.openWindow({
        url: val,
        external: false,
      });
    },
  },
};
</script>
<style lang="scss">
.attractionsPage {
  position: relative;
  padding-top: 20px;

  .imgBox {
    margin: 0 10px ;
    img{
      vertical-align:top;
    }
  }

  .flower {
    position: absolute;
    z-index: 2;

    &.f1 {
      top: 400px;
      right: 0;
    }

    &.f2 {
      top: 100px;
      left: 0;
    }

    &.f3 {
      bottom: 200px;
      left: 0;
    }
  }
}
</style>