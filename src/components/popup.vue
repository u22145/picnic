<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-actions>
        <img v-if="popupItem != 'Thanks'" :src="require(`../assets/img/popup/${popupIconType}.svg`)">
        <!-- 什麼是隨機代碼 -->
        <div class="item" v-if="popupItem== 'Question'">
          <h6>什麼是隨機號碼？</h6>
          <ol>
            <li>如為紙本電子發票，可於發票號碼下方小字看見發票隨機碼並手動輸入。</li>
            <li>如為電子載具，請於開立發票之載具中，以手機截圖當筆發票存摺之消費明細並上傳。</li>
            <br>
          </ol>
          <v-btn @click="closePopup" class="closePopup">返回</v-btn>
        </div>
        <!-- /什麼是隨機代碼 -->
        <!-- 什麼是載具手機條碼 -->
        <div class="item" v-if="popupItem== 'CloudInvoice'">
          <h6>什麼是手機條碼？</h6>
          <ol>
            <li>「手機條碼」服務由財政部提供，</li>
            <li>「手機條碼」是可以儲存發票的「發票載具」之一，只要在結帳時將手機條碼出示給店員刷一下，就可以將發票存到「手機條碼」中！還可以將其他載具中的發票歸戶至手機條碼中一併管理（請參考"歸戶教學"）。</li>
            <li>存入的發票將於48小時內顯示於發票載具App中，確切時間將根據各店家上傳發票資料有所差異。</li>
            <br>
          </ol>
          <v-btn @click="closePopup" class="closePopup">返回</v-btn>
        </div>
        <!-- /什麼是載具手機條碼 -->
        <!-- qrCode 動畫 -->
        <div class="item" v-if="popupItem== 'QrCodeAnimation'">
          <h6>掃描左下方 QR Code</h6>
          <div>
            <img src="@/assets/img/popup/QrCodeAnimation.svg" width="100%">
          </div>
          <v-btn @click="closePopup('QrCodeAnimation')" class=" QRCodeBtn">
            我已了解，開始掃描QR Code
          </v-btn>
        </div>
        <!-- /qrCode 動畫 -->
        <!-- 填完表單後，是否要玩遊戲 -->
        <div class="item" v-if="popupItem== 'Check'">
          <h6>恭喜你<br>成功登錄發票</h6>
          <p>如發票符合指定通路禮資格<br>將會於活動結束後一併開獎抽出</p><br>
          <router-link class="btColor" to="/" v-if="isDraw"
            @click="$addTags(popupTags.gotoIndex,null,null,{path: '/'}), $urlHash('gift')">指定通路發票加碼抽<br>100點LINE POINTS</router-link>
          <router-link class="btColor" to="gamPage" v-else
            @click="$addTags(popupTags.btnGoPlay,null,null,{path: '/gamPage'})">馬上玩春風貓賞花地圖</router-link>
        </div>
        <!-- /填完表單後，是否要玩遊戲 -->
        <!-- 玩完遊戲後，顯示恭喜中獎或未中獎 -->
        <div :class="{thanks:popupItem == 'Thanks'}" class="item"
          v-if="popupItem == 'Winning' || popupItem == 'Thanks' ">
          <br>
          <div v-if="prize == null" style="width: 100%;">
            <v-img  contain :eager=true :src="require(`../assets/img/gam/as/a${index}.png`)" width="100%" />
            <p>和春風貓一起<br><strong>{{name}}開心看櫻花</strong></p>
          </div>
          <div v-else  >恭喜您獲得<br>
            <strong>LINE POINTS {{name}}</strong><br>抽獎資格
          </div>
         <br>
          <router-link class="btColor" to="attractionsPage"
            @click="$addTags(popupItem == 'Winning'? popupTags.winGotoIndex : popupTags.notWinGotoIndex ,null,null,{path: '/attractionsPage'})">
            看更多賞花景點
          </router-link>
          <span v-if="popupItem == 'Winning'" class="remark">*中獎資格審核無誤後，將於5/17前發放完畢</span>
        </div>
        <!-- /玩完輪盤後，顯示恭喜中獎或未中獎 -->
        <!-- 邀請好友 -->
        <div class="item" v-if="popupItem== 'Friend'">
          <h6>你已送出邀請囉！</h6>
          <p>記得提醒你邀請的好友<br>加入春風LINE吧~</p>
          <router-link class="btColor" to="/" @click.native="$addTags(appTags.formPage,null,null,null)">回首頁
          </router-link>
        </div>
        <!-- /邀請好友 -->
        <!-- 個資法 -->
        <div class="item" v-if="popupItem== 'Information'">
          <h6>個資法聲明</h6>
          <div class="InformationBox">
            <p>(一)依據個人資料保護法(以下稱個資法)第八條一項規定，應向活動參加者告知下列事項：
              <ol>
                <li>蒐集個人資料之主體：正隆股份有限公司(以下稱本公司)</li>
                <li>蒐集之目的：作為參與本次本公司促銷活動，抽獎聯繫及後續相關程序之使用。</li>
                <li>蒐集之類別：姓名、身分證字號、聯絡電話、行動電話、寄送地址、戶籍地址。</li>
              </ol>
            </p>
            <p> (二)個人資料利用之期間、地區、對象及方式
              <ol>
                <li>期間：抽獎活動期間(包括後續寄送及相關程序執行完畢)</li>
                <li>地區：本國</li>
                <li>對象：本公司、本公司委託機關及執行活動時之必要相關人員</li>
              </ol>
            </p>
            <p> (二)個人資料利用之期間、地區、對象及方式
              <ol>
                <li>期間：抽獎活動期間(包括後續寄送及相關程序執行完畢)</li>
                <li>地區：本國</li>
                <li>對象：本公司、本公司委託機關及執行活動時之必要相關人員</li>
                <li>方式：以自動化機器或其他非自動化之利用方式</li>
                <li>活動參加者同意本公司得將其部分姓名與電話，公佈於活動網站或相關行銷活動網站或宣傳物中並同意本公司蒐集其姓名及聯絡方式（電話、地址或E-Mail）作為贈獎聯繫使用。</li>
              </ol>
            </p>
            <p>(三)依據個資法第三條規定，活動參與者就其提供之個人資料，得行使下列之權利：<br>
              依個人資料保護法的規定，活動參與者就本公司保有的個人資料，得請求行使查詢或閱覽、製給複製本、補充或更正、停止蒐集處理或利用、刪除之權利；惟本公司依法應執行職務所必要者，得不依活動參與者之請求為之。</p>
            <p> (四)不提供個人資料所致之權益影響：<br>
              活動參與者可自由選擇是否提供個人資料予本公司，若拒絕提供者，恕無法參加本活動。並且經檢舉其個人資料冒用、盜用、資料不實或其他情事足以確認活動參與者身分不符等情形，致本公司無法進行必要之確認作業，本公司保有停止本活動相關服務提供之權利，如有不便之處，敬請見諒。
            </p>
            <v-btn @click="closePopup" class=" closePopup">返回</v-btn>
          </div>
        </div>
        <!-- /個資法 -->
        <!-- 查詢指定通路發票 -->
        <div class="item" v-if="popupItem== 'Bill'">
          <h6>查詢指定通路發票</h6>
          <div class="bill" v-if="new Date() > new Date(this.startTime)">
            <p v-for="item in bill" :key="item.sellerName">
              {{item.val}} :
              <span v-if="new Date(item.startTime) > new Date() ">活動發票尚在審核中</span>
              <span v-else-if="sellerName.find(x => x.sellerName == item.sellerName)">獲得30點 LINE POINTS</span>
              <span v-else>已額滿</span>
            </p>
          </div>
          <p v-if="new Date() < new Date(this.startTime)"><strong>活動發票<br>尚在審核階段</strong>
          </p>
          <span>*審核時間為7-14個工作天
            <br>*中獎名單：於12/14(三)公佈
            <br>*點數將統一於12/15-12/23內發放
            <br>(不包含假日)</span>
          <!-- <a href="javascript:void(0)" @click="closePopup"><img src="../assets/img/from/btnBackToIndex.png"></a> -->
        </div>
        <!-- /查詢指定通路發票 -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import store from '../store/tags';
  // import { markRaw } from "vue";
  export default {
    name: 'popupBox',
    props: ['popupIconType', 'popupItem', 'prize', 'canSendTime', 'index', 'name', 'sellerName', 'isDraw'],
    data: () => ({
      startTime: '2022-11-04',
      bill: [{
        sellerName: '大潤發',
        startTime: '2022-11-04',
        val: '大潤發'
      }, {
        sellerName: '全聯',
        startTime: '2022-11-11',
        val: '全聯'
      }, {
        sellerName: '正隆',
        startTime: '2022-11-19',
        val: 'AeSHOP'
      }],
      dialog: true,
      gCAPTCHA_token: '',
      Friend: '',
    }),
    computed: {
      popupTags() { //愛酷標籤
        return store.state.popupTags
      }
    },
    methods: {
      closePopup(val) {
        if (val == 'QrCodeAnimation') {
          // 關閉彈窗 打開QR Code相機
          this.$emit("getQRCodeData", false);
        }
        // 關閉彈窗
        this.$emit("popupStatus", false);
      },
    },
  }
</script>
<style lang="scss">
  #app {
    .message {
      font-size: 13px;
      color: #C35238;
      margin-bottom: 10px;
    }

    .v-dialog {
      overflow-y: inherit;
    }

    .v-btn {
      cursor: pointer;
      border-radius: 20px;
      width: 100%;
      padding: 8px 20px;
      font-weight: 500;
      font-size: 18px;
      margin: 0 auto 20px auto;
      text-align: center;

      &.closePopup,&.QRCodeBtn{
        color: #B56D21;
        border: 2px solid #B56D21;
        background-color: #ffffff;
      }
    }

    #getVerificationCode {
      color: #000000;
      border-radius: 20px;
      padding: 15px;
      background-color: #EBD559 !important;

      span {
        display: block;
      }

      &.reciprocal {
        border: 1px dashed #EBD559;
        background-color: #ffffff !important;
        padding: 5px 15px;
      }
    }
  }

  .btColor {
    background-color: #B56D21;
    color: #ffffff !important;
    width: 70%;
    border-radius: 40px;
    padding: 10px 0;
    text-align: center;
    font-size: 22px;
    display: block;
    margin: 0 auto;
    text-decoration: none;
    font-weight: 700;
    width: 100%;
  }

  .item .InformationBox {
    max-height: 24vh;
    overflow-y: scroll;

    p {
      margin-bottom: 15px !important;
      text-align: left !important;
      font-size: 14px !important;
      color: #222222 !important;
    }
  }

  .v-dialog {
    overflow-y: inherit;
    box-shadow: none;
    width: 90% !important;

    .theme--light.v-sheet {
      background-color: rgb(255 255 255 / 0%);
    }

    .v-sheet.v-card:not(.v-sheet--outlined) {
      box-shadow: none;
    }
    ol{
      text-align: left;
    }
    .v-card {
      position: relative;

      .v-card__title {
        position: absolute;
        left: 17%;
        top: -28%;
      }
    }

    .v-sheet.v-card,
    .v-card__actions {
      border-radius: 12px;
    }

    .v-card__actions {
      overflow: hidden;
      background-color: #ffffff;
      flex-direction: column;
      box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);

      >img {
        &:first-child {
          position: absolute;
          top: -55px;
        }

        &+img {
          margin-top: 60px;
        }
      }

      .item {
        margin-top: 60px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 90%;
        text-align: center;

        &.thanks {
          margin-top: 0;

          .v-image {
            margin-bottom: 10px;
          }
        }

        h6 {
          font-size: 28px;
          font-weight: 900;
          margin-bottom: 20px;
          text-align: center;
        }

        p {
          font-size: 18px;
          text-align: center;
        }

        strong {
            font-size: 22px;
          }
        .remark {
          padding-top: 10px;
          font-size: 14px;
          color: #858585;
        }
      }
    }
  }
</style>