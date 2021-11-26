<template>
  <div class="camera-preview">
    <video
      ref="cameraVideo"
      class="qrcode-video-preview"
      autoplay
      playsinline
      id="preview"
    ></video>
    <div class="camera-preview-title">
      <div class="camera-preview-title-arrow" @click="$router.back()"></div>
      <div class="camera-preview-title-text">扫一扫</div>
      <div class="camera-preview-title-album">相册</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  props: {
    fileBase64: {
      type: String,
      default: "",
    },
  },
  emits: ["update:fileBase64"],
  data() {
    return {
      currentStream: undefined,
    };
  },
  mounted() {
    this.initCamera();
  },
  beforeRouteLeave(to, from, next) {
    if (typeof this.currentStream !== "undefined" && this.currentStream) {
      this.stopMediaTracks(this.currentStream);
    }
    next();
  },
  methods: {
    initCamera() {
      if (typeof this.currentStream !== "undefined" && this.currentStream) {
        this.stopMediaTracks(this.currentStream);
      }
      const constraints = {
        video: { facingMode: "environment" },
        audio: false,
      };
      const self = this;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (stream: any) {
            self.currentStream = stream;
            //将视频流实时播放在video
            (self.$refs.cameraVideo as any).srcObject = stream;
            //截取video内容
            setTimeout(() => {
              self.screenShot();
            }, 2000);
          })
          .catch(function (err) {
            alert(err);
          });
      }
    },
    stopMediaTracks(stream: any) {
      stream.getTracks().forEach((track: any) => {
        track.stop();
      });
    },
    screenShot() {
      console.log("screenShot");
      // let $canvas = $("canvas");
      // let $video = $("video");
      // $canvas.attr({
      //   width: $video.width(),
      //   height: $video.height(),
      // });
      // let ctx = $canvas[0].getContext("2d");
      // ctx.drawImage($video[0], 0, 0, $video.width(), $video.height());
      // let base64 = $canvas[0].toDataURL("images/png");
      // //截图成功对图片进行识别
      // this.decodeQrcode(base64);
    },
  },
});
</script>

<style scoped>
.qrcode-video-preview {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  left: 0;
  top: 0;
  object-fit: cover;
  transform: scale(1.05, 1.05);
}
.camera-preview-title {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.camera-preview-title-text{
  width: 60%;
  font-weight: bold;
  transform: translateX(5px);
}
.camera-preview-title-arrow {
  width: 20px;
  height: 20px;
  border-left: 2px;
  border-bottom: 2px;
  border-right: 0;
  border-top: 0;
  border-color: #fff;
  border-style: solid;
  transform: rotate(45deg);
  float: left;
}
.camera-preview-title-album {
  float: right;
  font-size: 16px;
}
</style>