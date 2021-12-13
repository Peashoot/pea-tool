<template>
  <div class="qrcode-page">
    <div class="qrcode-title">
      <van-icon
        class="qrcode-title-icon"
        name="/res/images/qrcode.png"
        size="36px"
      />
      <div>二维码</div>
    </div>
    <van-tabs v-model:active="active">
      <van-tab title="解码" style="font-size: 1rem">
        <button class="qrcode-decode-camera-button" @click="openCamera">
          打开相机
        </button>
        <textarea
          class="qrcode-origin-textarea"
          v-model="qrcodeResult"
          rows="10"
          placeholder="二维码内容在此显示"
          readonly
        />
        <i
          class="fa fa-copy fa-lg qrcode-result-copy"
          @click="copyToClipboard"
        />
      </van-tab>
      <van-tab title="编码">
        <textarea
          class="qrcode-origin-textarea"
          rows="10"
          v-model="qrcodeText"
          placeholder="请输入二维码内容"
          autofocus
        />
        <vue-qr :text="qrcodeText" />
      </van-tab>
    </van-tabs>
    <span v-show="toastMessage" class="qrcode-page-toast-message">{{
      toastMessage
    }}</span>
    <div class="qrcode-warning-container" v-show="showWarning">
      <div class="qrcode-warning">
        <div class="qrcode-warning-content">
          检测到二维码内容是链接地址，是否跳转？
        </div>
        <div class="qrcode-warning-separator"></div>
        <div class="qrcode-warning-confirm" @click="jumpToResult">Do it!</div>
        <div class="qrcode-warning-cancel" @click="showWarning = false">
          Duck不必
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Icon, Tab, Tabs } from "vant";
import { VueQR } from "@/components";
import * as evoke from "@/utils/evokeapp";
export default defineComponent({
  data() {
    return {
      /**
       * tab激活索引
       */
      active: 0,
      /**
       * 二维码解码内容
       */
      qrcodeResult: "",
      /**
       * 二维码文本
       */
      qrcodeText: "",
      /**
       * toast提示信息
       */
      toastMessage: "",
      /**
       * 是否显示警告
       */
      showWarning: true,
    };
  },
  components: {
    "van-icon": Icon,
    "van-tab": Tab,
    "van-tabs": Tabs,
    "vue-qr": VueQR,
  },
  beforeRouteEnter(to, from, next) {
    to.params.qrcodeResult = from.params.qrcodeResult;
    next();
  },
  created() {
    this.qrcodeResult = this.$route.params.qrcodeResult as string;
    this.showWarning = evoke.isEffectiveUrl(this.qrcodeResult);
  },
  methods: {
    openCamera() {
      this.$router.push("/camera");
    },
    /**
     * 显示提示消息
     */
    showToast(msg: string, interval: number = 3000) {
      this.toastMessage = msg;
      setTimeout(() => {
        this.toastMessage = "";
      }, interval);
    },
    /**
     * 复制二维码内容
     */
    copyToClipboard() {
      navigator.clipboard.writeText(this.qrcodeResult);
      this.showToast("复制成功");
    },
    /**
     * 跳转链接
     */
    jumpToResult() {
      window.open(evoke.getTargetLink(this.qrcodeResult));
    },
  },
});
</script>

<style scoped>
.qrcode-page {
  background: #f7f7f7;
  min-height: 100vh;
  font-size: 0;
}
.qrcode-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  padding: 12px;
}
.qrcode-title-icon {
  margin-right: 12px;
  transform: translateY(3px);
}
.qrcode-origin-textarea {
  resize: none;
  width: 100%;
  padding: 10px 16px;
  border-width: 0;
  box-sizing: border-box;
  margin: 0;
  font-size: 1rem;
}
.qrcode-origin-textarea::placeholder {
  color: #ccc;
}
.qrcode-decode-camera-button {
  margin: 20px 0;
  width: 140px;
  height: 45px;
  border-width: 0px;
  border-radius: 5px;
  background: #1989fa;
  color: #ffffff;
}
.qrcode-result-copy {
  float: right;
  transform: translateY(-220%);
  margin: 6px;
  color: #777777;
}
.qrcode-page-toast-container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qrcode-page-toast-message {
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 14px;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
  padding: 7px 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
}
.qrcode-warning-container {
  position: absolute;
  z-index: 21;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.2);
}
.qrcode-warning {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.qrcode-warning-content {
  width: 260px;
  padding: 40px 20px;
  text-align: center;
}
.qrcode-warning-separator {
  width: 100%;
  height: 1px;
  background: #e5e5e5;
}
.qrcode-warning-confirm {
  display: flex;
  width: 50%;
  height: 45px;
  border-width: 0px;
  align-items: center;
  justify-content: center;
  background: #1989fa;
  color: #ffffff;
  float: left;
}
.qrcode-warning-cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 45px;
  border-width: 0px;
  background: #ffffff;
  color: #1989fa;
  float: right;
}
</style>