<template>
  <div class="qrcode-page">
    <div class="qrcode-title">
      <van-icon name="/res/images/qrcode.png" size="48px" />
      <div>二维码解析器</div>
    </div>
    <van-tabs v-model:active="active">
      <van-tab title="编码">
        <div>二维码内容</div>
        <textarea
          class="qrcode-origin-textarea"
          rows="10"
          v-model="qrcodeText"
          placeholder="请输入二维码内容"
          autofocus
        ></textarea>
        <div class="qrcode-generate-setting"></div>
        <vue-qr :text="qrcodeText" />
      </van-tab>
      <van-tab title="解码">
        <div>
          <van-uploader @after-read="afterUpload"></van-uploader>
        </div>
        <div>{{ qrcodeResult }}</div>
        <button @click="openCamera">打开相机</button>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Icon, Tab, Tabs, Uploader } from "vant";
import { VueQR } from "@/components";
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
    };
  },
  components: {
    "van-icon": Icon,
    "van-tab": Tab,
    "van-tabs": Tabs,
    "van-uploader": Uploader,
    "vue-qr": VueQR,
  },
  beforeRouteEnter(to, from, next) {
    to.params.qrcodeResult = from.params.qrcodeResult;
    next();
  },
  created() {
    this.qrcodeResult = this.$route.params.qrcodeResult as string;
  },
  methods: {
    openCamera() {
      this.$router.push("/camera");
    },
  },
});
</script>

<style scoped>
.qrcode-page {
  background: #f7f7f7;
  min-height: 100vh;
}
.qrcode-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}
.qrcode-origin-textarea {
  resize: none;
  width: 70%;
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.qrcode-origin-textarea::placeholder {
  color: #ccc;
}
</style>