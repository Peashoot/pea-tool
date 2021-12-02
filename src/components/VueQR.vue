<template>
  <div class="qrcode-generate">
    <div class="qrcode-generate-setting-container">
      <div class="qrcode-generate-setting-item">
        <label>
          <span>容错级别</span>
          <input type="range" v-model="correctLevel" min="0" max="3" />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>空白边框比例</span>
          <input type="number" v-model="margin" min="0" max="1" step="0.05" />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>实点颜色</span>
          <input type="color" v-model="colorDark" />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>空白颜色</span>
          <input type="color" v-model="colorLight" />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>背景图片</span>
          <input
            type="file"
            accept="image/*"
            @change="selectBgFile($event.target.files)"
          />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>背景叠加色</span>
          <input type="color" v-model="backgroundDimming" />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>背景叠加色透明度</span>
          <input
            type="number"
            v-model="backgroundDimmingAlpha"
            min="0"
            max="255"
          />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>Logo图片</span>
          <input
            type="file"
            accept="image/*"
            @change="selectLogoFile($event.target.files)"
          />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>Logo比例</span>
          <input
            type="number"
            v-model="logoScale"
            min="0"
            max="1"
            step="0.05"
          />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>Logo叠加色</span>
          <input type="color" v-model="logoBackgroundColor" />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>Logo叠加色透明度</span>
          <input
            type="number"
            v-model="logoBackgroundColorAlpha"
            min="0"
            max="255"
          />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>Logo白边宽度</span>
          <input
            type="number"
            v-model="logoMargin"
            min="0"
            max="200"
            step="1"
          />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>Logo圆角半径</span>
          <input
            type="number"
            v-model="logoCornerRadius"
            min="0"
            max="200"
            step="1"
          />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>Logo圆角半径</span>
          <input
            type="number"
            v-model="logoCornerRadius"
            min="0"
            max="200"
            step="1"
          />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>数据区域点缩小比例</span>
          <input type="number" v-model="dotScale" min="0" max="1" step="0.05" />
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <input type="checkbox" v-model="binarize" />
          <span>启用二值化处理</span>
        </label>
      </div>
      <div class="qrcode-generate-setting-item">
        <label>
          <span>二值化阈值</span>
          <input
            type="number"
            v-model="binarizeThreshold"
            min="0"
            max="255"
            step="1"
          />
        </label>
      </div>
    </div>
    <div class="qrcode-generate-preview-container">
      <div
        class="qrcode-generate-preview-view"
        ref="previewImage"
        :style="{ height: previewImgHeight }"
      >
        <img
          class="qrcode-generate-preview-image"
          :src="imgUrl"
          v-if="text && bindElement"
        />
        <div v-else class="qrcode-generate-preview-alt">此处预览二维码</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toBoolean } from "vue-qr/src/packages/util";
import readAsArrayBuffer from "vue-qr/src/packages/readAsArrayBuffer";
import { AwesomeQR } from "vue-qr/src/lib/awesome-qr";
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  name: "vue-qr",
  data() {
    return {
      /**
       * 二维码预览区域高度
       */
      previewImgHeight: "308px",
      /**
       * 二维码图片地址
       */
      imgUrl: "",
      qid: "",
      /**
       * 容错级别 0-3
       */
      correctLevel: 1,
      /**
       * 尺寸, 长宽一致, 包含外边距
       */
      size: 540,
      /**
       * 空白区比例
       */
      margin: 0.16,
      /**
       * 实点的颜色
       */
      colorDark: "#000000",
      /**
       * 空白区的颜色
       */
      colorLight: "#FFFFFF",
      /**
       * 欲嵌入的背景图地址
       */
      bgSrc: undefined,
      /**
       * 叠加在背景图上的颜色, 在解码有难度的时有一定帮助
       */
      backgroundDimming: "#000000",
      backgroundDimmingAlpha: 0,
      /**
       * 嵌入至二维码中心的 LOGO 地址
       */
      logoSrc: undefined,
      /**
       * Logo 背景色,需要设置 logo margin
       */
      logoBackgroundColor: "#ffffff",
      /**
       * Logo背景叠加色透明度
       */
      logoBackgroundColorAlpha: 1,
      /**
       * 欲嵌入的背景图 gif 地址,设置后普通的背景图将失效。设置此选项会影响性能
       */
      gifBgSrc: undefined,
      /**
       * 用于计算 LOGO 大小的值, 过大将导致解码失败, LOGO 尺寸计算公式 logoScale*(size-2*margin)
       */
      logoScale: 0.2,
      /**
       * LOGO 标识周围的空白边框
       */
      logoMargin: 0,
      /**
       * LOGO 标识及其边框的圆角半径
       */
      logoCornerRadius: 8,
      /**
       * 若设为 true, 背景图外将绘制白色边框
       */
      whiteMargin: true,
      /**
       * 数据区域点缩小比例,默认为1
       */
      dotScale: 1,
      /**
       * 若为 true, 背景图的主要颜色将作为实点的颜色, 即 colorDark,默认 true
       */
      autoColor: true,
      /**
       * 若为 true, 图像将被二值化处理, 未指定阈值则使用默认值
       */
      binarize: false,
      /**
       * (0 < threshold < 255) 二值化处理的阈值
       */
      binarizeThreshold: 128,
      /**
       * 生成的二维码 Data URI 可以在回调中取得,第一个参数为二维码 data URL, 第二个参数为 props 传过来的 qid(因为二维码生成是异步的,所以加个 id 用于排序)
       */
      callback: function () {
        return undefined;
      },
      /**
       * 指定是否需要自动将生成的二维码绑定到HTML上, 默认是true
       */
      bindElement: true,
      /**
       * 背景色
       */
      backgroundColor: "#FFFFFF",
      /**
       * 组件选项控制二维码中零件的外观
       * scale: 在 QR 码指定区域的块的比例
       * protectors: 控制是否在 QR 码的指定区域下绘制半透明保护器
       */
      components: {
        data: {
          scale: 1,
        },
        timing: {
          scale: 1,
          protectors: false,
        },
        alignment: {
          scale: 1,
          protectors: false,
        },
        cornerAlignment: {
          scale: 1,
          protectors: true,
        },
      },
    };
  },
  watch: {
    $props: {
      deep: true,
      handler() {
        this.main();
      },
    },
  },
  mounted() {
    this.main();
    let self = this;
    this.$nextTick(function () {
      self.previewImgHeight = self.$refs.previewImage.clientWidth + "px";
    });
  },
  methods: {
    async main() {
      // const that = this;
      if (this.gifBgSrc) {
        const gifImg = await readAsArrayBuffer(this.gifBgSrc);
        const logoImg = this.logoSrc;
        this.render(undefined, logoImg, gifImg);
        return;
      }
      const bgImg = this.bgSrc;
      const logoImg = this.logoSrc;
      this.render(bgImg, logoImg);
    },
    async render(img, logoImg, gifBgSrc) {
      const that = this;
      new AwesomeQR({
        gifBackground: gifBgSrc,
        text: that.text,
        size: parseFloat(that.size),
        margin: (parseFloat(that.margin) * parseFloat(that.size)) / 2,
        colorDark: that.colorDark,
        colorLight: that.colorLight,
        backgroundColor: that.backgroundColor,
        backgroundImage: img,
        backgroundDimming: that.getRgbColor(
          that.backgroundDimming,
          parseInt(that.backgroundDimmingAlpha)
        ),
        logoImage: logoImg,
        logoScale: parseFloat(that.logoScale),
        logoBackgroundColor: that.getRgbColor(
          that.logoBackgroundColor,
          parseInt(that.logoBackgroundColorAlpha)
        ),
        correctLevel: parseInt(that.correctLevel),
        logoMargin: parseInt(that.logoMargin),
        logoCornerRadius: parseInt(that.logoCornerRadius),
        whiteMargin: toBoolean(that.whiteMargin),
        dotScale: parseFloat(that.dotScale),
        autoColor: toBoolean(that.autoColor),
        binarize: toBoolean(that.binarize),
        binarizeThreshold: parseInt(that.binarizeThreshold),
        components: that.components,
      })
        .draw()
        .then((dataUri) => {
          this.imgUrl = dataUri;
          that.callback && that.callback(dataUri, that.qid);
        });
    },
    selectBgFile(fileList) {
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let self = this;
        this.gifBgSrc = undefined;
        this.bgSrc = undefined;
        reader.onload = () => {
          if (file.type && file.type.indexOf("gif") !== -1) {
            self.gifBgSrc = reader.result;
          } else {
            self.bgSrc = reader.result;
          }
        };
      }
    },
    selectLogoFile(fileList) {
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let self = this;
        this.logoSrc = undefined;
        reader.onload = () => {
          self.logoSrc = reader.result;
        };
      }
    },
    getRgbColor(color, alpha) {
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var sColor = color.toLowerCase();
      if (reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        var sColorChange = [];
        for (var j = 1; j < 7; j += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(j, j + 2)));
        }
        return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
      } else {
        return sColor;
      }
    },
  },
};
</script>

<style scoped>
.qrcode-generate-preview-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrcode-generate-preview-view {
  background: #fff;
  width: 78%;
  max-width: 320px;
}
.qrcode-generate-preview {
  width: 100%;
  height: 100%;
}
.qrcode-generate-preview-image {
  width: 100%;
  height: 100%;
}
.qrcode-generate-preview-alt {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>