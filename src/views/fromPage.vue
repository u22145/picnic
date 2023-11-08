<template>
  <div class="fromPage animate__animated animate__fadeInUp animate__slow">
    <v-img class="title animate__animated animate__fadeInUp animate__slow" contain :eager=true
      src="../assets/img/gam/title.png" width="0" @load="$emit('getLoading', false)" /><br>
    <v-tabs v-model="tab" fixed-tabs>
      <v-tab v-for="item in items" :key="item"
        @click="$addTags(tab == 0 ? fromTags.Epaper : fromTags.paper, null, null, null)">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" @load="$emit('getLoading', false)">
      <v-tab-item>
        <v-radio-group v-model="cloudInvoice" row class="cloudInvoice">
          <v-radio label="手動輸入" color="red" value="1"></v-radio>
          <v-radio label="載具輸入" color="red" value="2"></v-radio>
          <!-- <v-radio label="掃描輸入" color="red" value="3"></v-radio> -->
        </v-radio-group>
        <div class="textBox">
          <p>協助手動輸入電子發票資訊，<br>更有利加速審核發放獎項唷！</p>
          <p v-if="cloudInvoice !=2 ">上傳之電子發票照片及登錄資訊須正確且能清晰辨識<br>若照片模糊、無法辨識或資格不符將喪失得獎資格</p>
        </div>
        <fromComponents :tab="tab" @getParentData="getParentData" :cloudInvoice="cloudInvoice" />
      </v-tab-item>
      <v-tab-item>
        <div class="textBox">
          <p>上傳之傳統發票資訊請確保正確無誤<br>如資格不符將喪失得獎資格</p>
          <p  v-if="tab == 1" style="font-size: 13px;text-align: center;color: #aaa;">並請記得將傳統發票正本<br>於登錄後的七天內寄回春風活動小組<br>110 台北市信義區東興街45號9樓）</p>
        </div>
        <fromComponents :tab="tab" @getParentData="getParentData" />
      </v-tab-item>
    </v-tabs-items>
    <googleRecapcha ref='googleRecapcha' @getGoogle="getGoogleRecapcha"></googleRecapcha>
    <popup :popupIconType="popupIconType" :popupItem="popupItem" :isDraw="isDraw" :inv_number="inv_number" v-if="dialog"
      @popupStatus="dialog=false" />
  </div>
</template>

<script>
  import axios from "axios";
  import swal from 'sweetalert2'
  import googleRecapcha from '@/components/googleRecapcha.vue';
  import popup from '../components/popup';
  import fromComponents from '../components/fromComponents'
  import store from '../store/tags';

  export default {
    name: 'fromPage',
    components: {
      popup,
      googleRecapcha,
      fromComponents,
    },
    props: [],
    data() {
      return {
        isActive: '',
        tab: null,
        parentInv_number: '',
        items: [
          '電子發票', '傳統發票',
        ],
        cloudInvoice: '1', //1=手動 ,2=載具 ,3=掃描
        form: '',
        gCAPTCHA_token: '',
        dialog: false,
        popupIconType: '',
        popupItem: '',
        prize: '',
        inv_number: '',
      }
    },
    computed: {
      fromTags() { //愛酷標籤
        return store.state.fromTags
      }
    },
    methods: {
      // 顯示popup視窗
      seePopUp(val, data) {
        this.dialog = true
        this.popupIconType = 'icon' + val
        this.popupItem = val
        this.isDraw = data.isDraw
        this.inv_number = data.inv_number
      },
      // 拿到子層資料
      getParentData(val) {
        console.log('拿到子層資料', val)
        this.form = val
        this.googleVerify()
      },
      // 打googleRecapcha
      googleVerify() {
        this.$refs.googleRecapcha.execute();
      },
      // 獲得googleRecapcha 資料
      getGoogleRecapcha(val) {
        this.gCAPTCHA_token = val
        this.addData()
      },
      // 傳資料
      addData() {
        var me = this;
        me.form.inv_type = me.tab + 1
        me.form.gCAPTCHA_token = me.gCAPTCHA_token
        me.form.cloudInvoice = me.cloudInvoice //1=手動 ,2=載具 ,3=掃描
        if (me.form.inv_type == 1) {
          //電子發票
          me.url = '/API/AddData_EInvoiceEnrollment/E2B1ED123CD74351911A023587A9DEE0'
          delete(me.form.buyCity) //移除購買城市
          // 判斷是哪種輸入模式
          switch (me.cloudInvoice) {
            case '1': //1=手動 
              delete(me.form.carrierNo) //移除載具手機條碼
              delete(me.form.verifyCode) //移除驗證碼(密碼)
              delete(me.form.scanning) //移除QR Code裡的資料
              break
            case '2': //,2=載具 
              delete(me.form.scanning) //移除QR Code裡的資料
              delete(me.form.inv_randomNumber) //移除隨機碼
              break
            default: //3=掃描
              delete(me.form.carrierNo) //移除載具手機條碼
              delete(me.form.verifyCode) //移除驗證碼(密碼)
              delete(me.form.inv_number) //發票號碼
              delete(me.form.inv_randomNumber) //隨機碼
              delete(me.form.inv_date) //發票日期
              delete(me.form.file_inv_photo) //照片
              break
          }
        } else {
          //傳統發票
          me.url = '/API/AddData_InvoiceEnrollment/F1F603B51C6C4EAEB3927CF7DCC51A06'
          delete(me.form.inv_randomNumber) //隨機碼
          delete(me.form.file_inv_photo) //上傳發票明細
          delete(me.form.carrierNo) //移除載具手機條碼
          delete(me.form.verifyCode) //移除驗證碼(密碼)
          delete(me.form.scanning) //移除QR Code裡的資料
          delete(me.form.carrierNo) //移除載具手機條碼
          delete(me.form.verifyCode) //移除驗證碼(密碼)
        }
        console.log('this.fff', me.form)
        var config = {
          method: "post",
          headers: {
            Authorization: `Bearer ${me.$accessToken}`,
          },
          url: me.$apiUrl + me.url,
          data: new FormData()
        }
        Object.keys(me.form).forEach(key => {
          switch (key) {
            case 'buyCity':
              config.data.append(key, `23春風週_購買地_${me.form[key]}`);
              break;
            case 'buyCategory':
              var newCategory = me.form[key].map(item => {
                return `23春風週_${item}`;
              })
              config.data.append(key, JSON.stringify(newCategory));
              break;
            case 'gender':
              config.data.append(key, `23春風週_性別_${me.form[key]}`);
              break;
            case 'liveCity':
              config.data.append(key, `23春風週_居住地_${me.form[key]}`);
              break;
            default:
              config.data.append(key, me.form[key]);
              break;
          }
        });

        swal.fire({
          didOpen: () => {
            swal.fire({
              allowOutsideClick: false
            });
            swal.showLoading();
            axios(config).then(res => {
              var data = res.data;
              console.log('data', data)
              if (data && data.success) {
                this.seePopUp('Check', data.data)
              } else {
                console.log('data', data)
                alert(data.message);
              }
            }).catch((err) => {
              console.log(err)
              alert("系統忙碌中，請稍後再試");
            }).finally(() => {
              swal.close();
            })
          }
        })
      },
    },
  }
</script>
<style lang="scss">
  #app {
    .fromPage .primary--text {
      color: #C35238 !important;
      caret-color: #C35238 !important;
    }
  }

  .fromPage {
    padding: 30px 15px;

    .container {
      padding: 0;
    }

    .theme--light.v-tabs>.v-tabs-bar {
      background: #ff00ff00;
    }

    .v-tab {
      background: rgba(225, 96, 51, 0.4);
      border-radius: 12px 12px 0 0;
      font-size: 20px;
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
      .textBox {
        text-align: center;

        p {
          margin: 0;
          padding-top: 20px;
          font-size: 16px;

          &+p {
            font-size: 12px;
            color: #858585;
          }
        }
      }
    }

    .v-input--selection-controls {
      margin-top: 0;
      padding-top: 20px;
    }

    .cloudInvoice .v-input--radio-group__input {
      justify-content: space-evenly;
    }

    .v-input--selection-controls__input .v-icon {
      color: #E7D128;
    }

    .v-window-item {

      &>.v-input--radio-group,
      &>.textBox {
        background-color: #ffffff;
        border-right: 3px solid #B56D21;
      }
    }
  }
</style>