<template>
  <div class="winnerPage animate__animated animate__fadeInUp animate__slow">
    <v-img class="title" contain :eager=true
      src="@/assets/img/winner/title.png" @load="$emit('getLoading', false)" />
    <v-tabs v-model="tab" fixed-tabs>
      <v-tab v-for="item in tabs" :key="item"
        @click="$addTags(tab == 0 ? fromTags.Epaper : fromTags.paper, null, null, null)">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" @load="$emit('getLoading', false)">
      <!-- <v-tab-item v-for="item in 4" :key="item">
        <img :src="require(`../assets/img/winner/tab${item}.png`)" width="100%"><br>
      </v-tab-item> -->
      <v-tab-item>
        <v-img class="title" contain :eager=true src="@/assets/img/winner/tab1.png" />
      </v-tab-item>
      <v-tab-item>
        <v-img class="title" contain :eager=true src="@/assets/img/winner/tab2.png" />
      </v-tab-item>
      <v-tab-item>
        <v-img class="title" contain :eager=true src="@/assets/img/winner/tab3.png" />
      </v-tab-item>
      <v-tab-item>
        <v-img class="title" contain :eager=true src="@/assets/img/winner/tab4_01.png" />
        <v-img class="title" contain :eager=true src="@/assets/img/winner/tab4_02.png" />
        <v-img class="title" contain :eager=true src="@/assets/img/winner/tab4_03.png" />
        <v-img class="title" contain :eager=true src="@/assets/img/winner/tab4_04.png" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  export default {
    name: 'winnerPage',
    components: {},
    data() {
      return {
        tab: null,
        tabs: [
          '第一重', '第二重', '第三重', '好友禮',
        ],
        
      }
    },
    mounted() {},
    methods: {

    }
  }
</script>
<style lang="scss">
  #app {
    .winnerPage .primary--text {
      color: #C35238 !important;
      caret-color: #C35238 !important;
    }
  }

  .winnerPage {
    padding: 30px 15px;

    .container {
      padding: 0;
    }

    .theme--light.v-tabs>.v-tabs-bar {
      background: #ff00ff00;
    }

    .v-tab {
      padding: 0;
      background: rgba(225, 96, 51, 0.4);
      border-radius: 12px 12px 0 0;
      font-size: 18px;
      color: #ffffff !important;
      border-right: 4px solid #C8E7ED;

      &:last-child {
        border-right: none;
      }

      &.v-tab--active {
        background: #E16033;

      }
    }

    .v-tabs-items {
      border-right: 3px solid #B56D21;
      border-bottom: 3px solid #B56D21;
      overflow: hidden;
      border-radius: 0 0 10px 10px;
      padding: 40px 20px;
    }

    .v-input--selection-controls {
      margin-top: 0;
      padding-top: 20px;
    }

    .cloudInvoice .v-input--radio-group__input {
      justify-content: space-evenly;
    }
    .v-tabs:not(.v-tabs--vertical):not(.v-tabs--right) > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes) .v-slide-group__prev{
      display: none;
    }
  }
</style>