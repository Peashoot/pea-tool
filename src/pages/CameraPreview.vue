<template>
  <div class="camera-preview">
    <video
      ref="cameraVideo"
      class="qrcode-video-preview"
      autoplay
      playsinline
      id="preview"
    />
    <div class="camera-preview-title">
      <div class="camera-preview-title-arrow" @click="$router.back()"></div>
      <div class="camera-preview-title-text">扫一扫</div>
      <div class="camera-preview-title-album">
        <input
          type="file"
          accept="image/*"
          capture="camera"
          @change="fileUploaded($event.target.files)"
        />
        相册
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  ChecksumException,
  FormatException,
  Exception,
  Result,
} from "@zxing/library";
export default defineComponent({
  data() {
    return {
      /**
       * 当前视频流
       */
      currentStream: ref<MediaStream | undefined>(undefined),
      /**
       * 二维码解析器
       */
      codeReader: new BrowserMultiFormatReader(),
      /**
       * 解析间隔
       */
      resolveInterval: 200,
    };
  },
  mounted() {
    this.initCamera();
  },
  beforeRouteLeave(to, from, next) {
    if (typeof this.currentStream !== "undefined" && this.currentStream) {
      this.stopMediaTracks(this.currentStream);
      this.codeReader.stopContinuousDecode();
    }
    next();
  },
  methods: {
    /**
     * 初始化视频流
     */
    initCamera() {
      if (typeof this.currentStream !== "undefined" && this.currentStream) {
        this.stopMediaTracks(this.currentStream);
      }
      // 默认打开设备的后置摄像头
      const constraints = {
        video: { facingMode: "environment" },
        audio: false,
      };
      const self = this;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (stream: MediaStream) {
            self.currentStream = stream;
            // 将视频流实时播放在video
            (self.$refs.cameraVideo as HTMLVideoElement).srcObject = stream;
            // 设置识别间隔，单位毫秒
            self.codeReader.timeBetweenDecodingAttempts = self.resolveInterval;
            // 持续的解析二维码
            self.codeReader.decodeFromVideoElementContinuously(
              self.$refs.cameraVideo as HTMLVideoElement,
              (result: Result, err?: Exception) => {
                if (result) {
                  // 解析成功，返回结果，跳回上一页面
                  self.$route.params.qrcodeResult = result.getText();
                  self.$router.back();
                }

                if (err) {
                  if (err instanceof NotFoundException) {
                    console.log("No QR code found.");
                  } else if (err instanceof ChecksumException) {
                    console.log("Found QR code but checksum was invalid.");
                  } else if (err instanceof FormatException) {
                    console.log("Found something weird");
                  } else {
                    console.log("Error decoding QR code", err);
                  }
                }
              }
            );
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    /**
     * 停止视频流
     */
    stopMediaTracks(stream: MediaStream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop();
      });
    },
    /**
     * 图片上传完成时，解析二维码
     */
    fileUploaded(fileList: FileList) {
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const self = this;
        reader.onload = () => {
          let imgElement = new Image();
          imgElement.src = reader.result as string;
          self.codeReader
            .decodeFromImageElement(imgElement)
            .then((result: Result) => {
              if (result) {
                self.$route.params.qrcodeResult = result.getText();
                self.$router.back();
              }
            });
        };
      }
    },
  },
});
</script>

<style scoped>
.camera-preview {
  background: #000;
}
.qrcode-video-preview {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  left: 0;
  top: 0;
  object-fit: cover;
  transform: scale(1.05, 1.05);
  background: #000;
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
.camera-preview-title-text {
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
  position: relative;
  float: right;
  font-size: 16px;
}
.camera-preview-title-album input {
  position: absolute;
  width: 100%;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}
</style>