<template>
  <v-container>
    <div class="formBox">
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- <div class="fakeInformation" v-if="$apiUrl != 'https://promo.andante-event.com.tw/a22live'">
          <a href="javascript:void(0)" @click.prevent="toneClear()">
            清除所有發票資料</a>
          <a href="javascript:void(0)" @click.prevent="Lazy()">
            填寫表單</a>
        </div> -->
        <!-- 載具手機條碼 -->
        <div v-if="tab == 0 && cloudInvoice == 2">
          <p class="title">手機條碼(載具)
            <span class="help" @click="seePopUp('CloudInvoice')">
              <v-icon color="darken-2">mdi-help-circle</v-icon>什麼是手機條碼？
            </span>
          </p>
          <v-text-field v-model="form.carrierNo" :rules="rules.carrierNo" :counter="8" maxlength="8" solo required
            label="/RF5365Q">
          </v-text-field>

          <!-- 驗證碼(密碼) -->
          <v-text-field solo v-model="form.verifyCode" :rules="rules.verifyCode"
            :append-icon="showVerifyCode ? 'mdi-eye' : 'mdi-eye-off'" :type="showVerifyCode ? 'text' : 'password'"
            label="請輸入驗證碼(密碼)" @click:append="showVerifyCode = !showVerifyCode"></v-text-field>
          <span class="help" style="width: 100%;position: relative;top: -25px;">
            <a href="https://www.einvoice.nat.gov.tw/APCONSUMER/BTC511W/" target="_blank">
              忘記驗證碼(密碼)
            </a>
          </span>
        </div>
        <!-- /載具手機條碼 -->

        <!-- 掃描QR Code -->
        <v-btn class="QRCodeBtn" v-if="tab == 0 && cloudInvoice == 3" @click="seePopUp('QrCodeAnimation')">掃描QR Code
        </v-btn>

        <div v-if="tab == 1 || cloudInvoice == 1|| cloudInvoice == 2 ||  cloudInvoice == 3 && scanningCheck ">
          <!-- 發票號碼 -->
          <p class="title">發票號碼
            <span v-if="tab == 0 && cloudInvoice == 1" class="help" @click="seePopUp('Question')">
              <v-icon color="darken-2">mdi-help-circle</v-icon>什麼是隨機碼？
            </span>
          </p>
          <v-text-field :disabled="cloudInvoice == 3" v-model="form.inv_number" :rules="rules.inv_number" :counter="10"
            maxlength="10" solo required label="AA12345678">
          </v-text-field>

          <!-- 隨機碼＆上傳發票明細 -->
          <div class="electronicBox" v-if="tab == 0 && cloudInvoice != 2">
            <v-select :disabled="cloudInvoice == 3 " :items="items" :rules="[v => !!v || 'Item is required']" solo
              required v-model="select" :label="select">
            </v-select>
            <v-text-field :disabled="cloudInvoice == 3 " v-if="select =='隨機碼'" v-model="form.inv_randomNumber"
              :rules="rules.inv_randomNumber" :counter="4" maxlength="4" solo required label="1234"></v-text-field>
            <v-file-input v-if="select =='上傳發票明細'" v-model="form.file_inv_photo" :rules="rules.file_inv_photo" required
              prepend-icon="mdi-camera" accept="image/png, image/jpeg, image/bmp" label="上傳發票明細" solo>
            </v-file-input>
          </div>

          <!-- 購買城市 -->
          <p class="title" v-if="tab == 1">購買城市</p>
          <v-select v-if="tab == 1" :items="cityItems" solo v-model="form.buyCity" label="請選擇" :rules="rules.buyCity">
          </v-select>

          <!-- 發票日期 -->
          <p class="title" style="line-height: 0.6;">發票日期</p>
          <span
            style=" font-size: 13px;color: #858585; margin-left: 5px;line-height: 2;">僅限活動期間發票（ 2023/03/03 - 2023/04/20 ）</span>
          <v-text-field :disabled="cloudInvoice == 3 " v-model="form.inv_date" type="date" :rules="rules.inv_date" solo
            required value="2018-07-22" min="2023-03-03" max="2023-04-20">
          </v-text-field>

        </div>
        <!-- 購買品項 -->
        <p class="title">購買品項(可複選)</p>
        <div class="checkboxBox">
          <v-checkbox color="red" v-model="form.buyCategory" v-for="(n,index) in buyItem" :key="index"
            :label="`${n.text}`" :value="n.value" required :rules="rules.buyCategory"></v-checkbox>
        </div>
        <br>

        <img :src="require(`../assets/img/from/line${tab}.png`)" width="100%"><br>

        <!-- 姓名 -->
        <p class="title">姓名</p>
        <v-text-field v-model="form.name" :rules="rules.name" solo required label="王小明">
        </v-text-field>

        <!-- 性別 -->
        <p class="title">性別</p>
        <v-radio-group v-model="form.gender" row>
          <v-radio label="男" color="red" value="男"></v-radio>
          <v-radio label="女" color="red" value="女"></v-radio>
        </v-radio-group><br>

        <!-- 手機號碼 -->
        <p class="title">手機號碼</p>
        <v-text-field v-model="form.mobile" :rules="rules.mobile" :counter="10" maxlength="10" solo required
          label="0912345678">
        </v-text-field>

        <!-- 電子信箱 -->
        <p class="title">電子信箱</p>
        <v-text-field v-model="form.email" :rules="rules.email" maxlength="100" solo required label="xxxx@xx.xx.xxx">
        </v-text-field>

        <!-- 居住城市 -->
        <p class="title">居住城市</p>
        <v-select :items="cityItems" solo v-model="form.liveCity" label="請選擇" :rules="rules.liveCity">
        </v-select>

        <!-- 並同意個資 -->
        <v-checkbox v-model="checkbox" required :rules="[v => !!v || '請勾選個資同意']">
          <template v-slot:label>
            <div>
              我已經詳盡讀並同意
              <a target="_blank" href="https://vuetifyjs.com" @click="seePopUp('Information')">
                個資告知事項及注意事項
              </a>
            </div>
          </template>
        </v-checkbox>
      </v-form><br>
      <v-btn :disabled="!valid" @click="validate()" class="presetBtn">
        確認送出
      </v-btn>
      <br>
      <br>
      <popup :popupIconType="popupIconType" :popupItem="popupItem" :prize="prize" v-if="dialog"
        @popupStatus="dialog=false" @getQRCodeData="getQRCodeData" />
    </div>
  </v-container>
</template>

<script>
  import popup from '../components/popup';
  import store from '../store/index';
  import axios from "axios";
  import liff from '@line/liff';
  import swal from 'sweetalert2';
  export default {
    name: 'formBox',
    props: ['tab', 'cloudInvoice'],
    components: {
      popup,
    },
    data: () => ({
      dialog: false,
      popupIconType: '',
      popupItem: '',
      prize: '',
      valid: true,
      showVerifyCode: false,
      form: {
        inv_type: '',
        carrierNo: '', //載具手機條碼
        verifyCode: '', //載具手機條碼 驗證碼(密碼)
        inv_number: '', //發票號碼
        inv_randomNumber: '', //隨機碼
        file_inv_photo: '', //上傳發票明細
        buyCity: '', //購買城市
        inv_date: '', //發票日期
        buyCategory: [], //購買品項
        name: '',
        gender: '男',
        mobile: '',
        email: '',
        liveCity: '', //居住城市
        gCAPTCHA_token: '',
        scanning: '', //QR Code裡的資料
      },
      rules: {
        carrierNo: [v => !!v || '請輸入手機條碼(載具)', v => /^\/[0-9A-Z.+-]{7}$/.test(v) ||
          '格式錯誤'
        ], // - 需放最後，不然要會跟 0-9 的 - 混淆
        verifyCode: [v => (!!v) || '請輸入驗證碼(密碼)'],
        inv_number: [v => !!v || '請輸入發票號碼', v => /^[A-Z]{2}[0-9]{8}$/.test(v) || '格式錯誤'],
        inv_randomNumber: [v => (!!v && v.length == 4) || '請輸入四位隨機碼', ],
        file_inv_photo: [v => !!v || '請上傳發票明細'],
        inv_date: [v => (!!v) || '請選擇發票日期'],
        buyCategory: [v => (!!v && v.length > 0) || '請選擇至少一個購買品項', ],
        name: [v => !!v || '請輸入姓名'],
        liveCity: [v => (!!v) || '請輸入居住城市'],
        buyCity: [v => (!!v) || '請輸入購買城市'],
        mobile: [v => !!v || '請輸入十位手機號碼', v => /^[0-9]{10}$/.test(v) || '格式錯誤'],
        email: [v => !!v || '請輸入電子信箱', v => /.+@.+\..+/.test(v) || '格式錯誤'],
      },
      select: '隨機碼',
      items: ['隨機碼', '上傳發票明細', ],
      checkbox: '',
      scanningCheck: false, //掃描QR Code成功
    }),
    computed: {
      cityItems() { // 城市list
        return store.state.cityItems
      },
      buyItem() { //購買品項
        return store.state.buyItem
      },
      fromTags() { //愛酷標籤
        return store.state.fromTags
      },

    },
    watch: {
      'cloudInvoice': function () {
        // 清空表單
        let me = this
        me.$refs.form.reset()
        this.$nextTick(function () {
          me.form.gender = '男'
          me.select = "隨機碼"
          me.inv_number = '' //發票號碼
          me.inv_date = '' //發票日期
          me.form.buyCity = '' //購買城市
          me.form.liveCity = '' //居住城市
          me.scanningCheck = false
        })
      },
      'form.scanning': function (val) {
        // 檢查qr code的內容
        if (/^[A-Z]{2}[0-9]{8}/.test(val)) {
          // qr code輸入正確
          this.form.inv_number = this.form.scanning.substring(0, 10) //發票號碼
          let yyymmmddd = this.form.scanning.substring(10, 17) //發票日期
          let yyy = yyymmmddd.substring(0, 3) //年
          let mm = yyymmmddd.substring(3, 5) //月
          let dd = yyymmmddd.substring(5, 7) //日
          this.form.inv_date = 1911 + Number(yyy) + '-' + mm + '-' + dd
          this.form.inv_randomNumber = this.form.scanning.substring(17, 21) //隨機碼
          this.scanningCheck = true
        } else {
          // qr code不正確
          swal.fire({
            text: JSON.stringify('請重新掃描qr code'),
            // text: JSON.stringify(val),
            allowOutsideClick: false
          })
        }
      },
    },
    mounted() {},
    methods: {
      Lazy() {
        // 填寫假資料 
        // this.form.carrierNo = '/aaaaaaa', //載具手機條碼
        // this.form.verifyCode = '111111', //載具手機條碼 驗證碼(密碼)
        // this.form.inv_number = "CC22222222"; //發票號碼
        // this.form.inv_randomNumber = "2222"; //隨機碼
        // this.form.inv_date = '2022-11-11'; //發票日期
        this.form.buyCity = '臺北市'; //購買城市
        this.form.name = '假資料';
        this.form.gender = '男';
        this.form.mobile = '0912345678';
        this.form.email = 'qwe@ee.ee';
        this.form.liveCity = '臺北市'; //居住城市
        this.form.buyCategory = ['春風抽取式和捲筒式', '春風1秒抽和捲筒廚紙', ]
        this.checkbox = true
      },
      // 清除測試站user本人帳號的所有資料
      toneClear() {
        var me = this;
        me.url = '/API/ExecJob_Reset/86A874CB1A1241E48A902909908EC8A3'
        var config = {
          method: "post",
          headers: {
            Authorization: `Bearer ${me.$accessToken}`,
          },
          url: me.$apiUrl + me.url,
        }
        swal.fire({
          didOpen: () => {
            swal.fire({
              allowOutsideClick: false
            });
            swal.showLoading();
            axios(config).then(res => {
              var data = res.data;
              if (data && data.success) {
                alert('資料已成功清除');
              } else {
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
      seePopUp(val) {
        this.dialog = true
        this.popupIconType = 'icon' + val
        this.popupItem = val
      },
      // 開啟相機，取得QR Code內容
      getQRCodeData() {
        this.dialog = false
        liff
          .scanCodeV2()
          .then((result) => {
            this.form.scanning = result.value
            // swal.fire({
            //   text: JSON.stringify(result),
            //   allowOutsideClick: false
            // })
          })
          .catch((error) => {
            swal.fire({
              text: JSON.stringify(error),
              allowOutsideClick: false
            })
            // console.log("error", error);
          });
      },
      // 驗證表單
      validate() {
        this.$refs.form.validate();
        if (this.$refs.form.validate()) {
          this.ParentData()
        }
      },
      ParentData() {
        this.$emit("getParentData", this.form)
      }
    },
  }
</script>
<style lang="scss">
  #app {
    .day {
      .v-text-field {
        padding: 0;
        margin: 0;
      }
    }
  }

  .formBox {
    background-color: #C8E7ED;

    .electronicBox .v-select .v-input__slot+.v-text-field__details {
      display: none !important;
    }

    .fakeInformation a {
      text-decoration: none;
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      color: #ffffff;
      background-color: #B56D21;
      margin: 0 10px 10px 0;
    }

    .v-btn {
      cursor: pointer;
      border-radius: 20px;
      width: 100%;
      padding: 8px 20px !important;
      font-weight: 500;
      font-size: 18px;
      margin: 0 auto 20px auto;
      text-align: center;
      border: 2px solid #B56D21;

      &.presetBtn {
        color: #ffffff;
        background-color: #B56D21;
      }

      // &.QRCodeBtn {
      //   background-image: linear-gradient(to bottom, #C35238, #EA765B) !important;
      //   border: none;
      //   color: #ffffff;
      //   margin-bottom: 20px !important;
      // }
      &.v-btn--disabled.v-btn--has-bg {
        background-color: rgba(181, 109, 33, 30%) !important;
      }

      &.v-btn--disabled {
        color: #B56D21 !important;
      }
    }

    .v-form {
      padding: 20px;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      border-right: 3px solid #B56D21;
      border-bottom: 3px solid #B56D21;
      border-radius: 0 0 10px 10px;

      .v-text-field__slot .theme--light.v-label {
        color: rgba(157, 157, 157, 61%);
      }

      >img {
        margin: 0 auto;
      }

      .help {
        width: 52%;
        float: right;
        display: inline-block;
        text-align: right;
        color: #E16033;
        font-size: 14px;

        .v-icon.v-icon {
          margin-right: 5px;
          font-size: 20px;
          color: #E16033;
        }
      }

      .title {
        position: relative;
        padding-left: 5px;
        margin-bottom: 5px;
      }

      .v-input--selection-controls {
        margin: 0;
        padding: 0;
      }

      .v-input__control {
        .v-messages {
          min-height: 0;

          &.error--text {
            margin-bottom: 12px;
          }
        }
      }
    }

    .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)>.v-input__control>.v-input__slot {
      background-color: #E7D128;
      box-shadow: none;
    }



    .v-input--checkbox.error--text:not(:last-child) .v-input__slot+.error--text {
      display: none;
    }
  }
</style>