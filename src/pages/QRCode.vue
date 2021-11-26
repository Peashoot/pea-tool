<template>
  <div class="qrcode-page">
    <div class="qrcode-title">
      <van-icon name="/res/images/qrcode.png" size="48px" />
      <div>二维码解析器</div>
    </div>
    <van-tabs v-model:active="active">
      <van-tab title="解码">
          <div>
              <van-uploader preview-size="260px" @after-read="afterUpload"></van-uploader>
          </div>
      </van-tab>
      <van-tab title="编码">编码内容</van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Icon, Tab, Tabs, Uploader } from "vant";
export default defineComponent({
  data() {
    return {
      active: 0,
      imgBase64: ""
    };
  },
  components: {
    "van-icon": Icon,
    "van-tab": Tab,
    "van-tabs": Tabs,
    "van-uploader": Uploader,
  },
  methods: {
    afterUpload(file: File) {
        if (!/image\/\w+/.test(file.type)) {
            this.$toast("请选择图片文件");
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imgBase64 = reader.result as string;
        };
    },
  },
});
</script>

<style scoped>
.qrcode-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}
</style>