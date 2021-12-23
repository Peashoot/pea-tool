<template>
  <div class="translate">
    <div class="translate-header">
      <!--关于按钮-->
      <div class="translate-setting">
        <div class="translate-setting-bar translate-setting-first-bar"></div>
        <div class="translate-setting-bar"></div>
        <div class="translate-setting-bar"></div>
      </div>
      <!--“Google翻译”-->
      <div class="translate-title">
        <span class="g1">G</span>
        <span class="o1">o</span>
        <span class="o2">o</span>
        <span class="g2">g</span>
        <span class="l">l</span>
        <span class="e">e</span>
        <span class="translate-title-content">{{ wordsTranslate }}</span>
      </div>
      <!--其他应用按钮-->
      <div class="translate-others">
        <div class="translate-others-row">
          <div class="translate-other-point"></div>
          <div class="translate-other-point"></div>
          <div class="translate-other-point"></div>
        </div>
        <div class="translate-others-row">
          <div class="translate-other-point"></div>
          <div class="translate-other-point"></div>
          <div class="translate-other-point"></div>
        </div>
        <div class="translate-others-row">
          <div class="translate-other-point"></div>
          <div class="translate-other-point"></div>
          <div class="translate-other-point"></div>
        </div>
      </div>
    </div>
    <!--语言选择框-->
    <div class="translate-language">
      <span class="translate-selection">{{ originalLangauge }}</span>
      <span class="material-icons translate-icon">swap_horiz</span>
      <span class="translate-selection">{{ resultLangaue }}</span>
    </div>
    <!--翻译区域-->
    <div class="translate-area">
      <!--原文区域框-->
      <div class="translate-origin-area">
        <!--输入窗-->
        <ediv
          class="translate-textarea-input"
          :placeholder="wordsPlaceholder"
          v-model="origin"
        />
        <!--输入菜单（翻译和清除）-->
        <div class="translate-input-menu">
          <div class="translate-input-menu-item">
            <div class="translate-do-translate">
              <div class="material-icons">arrow_forward</div>
            </div>
          </div>
          <div class="translate-input-menu-item" @click="origin = ''">
            <div class="translate-do-truncate">
              <div class="material-icons">close</div>
            </div>
          </div>
        </div>
        <!--检测到的源语言-->
        <div class="translate-detect-area">
          <div class="material-icons translate-detect-icon">auto_awesome</div>
          <div class="translate-detect-text">
            <div class="translate-detect-label">{{ detectLabel }}</div>
            <div class="translate-detect-result">{{ detectResult }}</div>
          </div>
        </div>
        <!--输入底部菜单（语音、发音和字数）-->
        <div class="translate-textarea-control">
          <div class="material-icons translate-voice-input">mic</div>
          <div class="material-icons translate-voice-input">volume_up</div>
          <div class="translate-words-count">
            {{ originLength }} / {{ convertNumberToString(maxlength) }}
          </div>
        </div>
      </div>
      <!--翻译结果区域框-->
      <div class="translate-result-area">
        <!--翻译结果-->
        <div class="translate-result-text">{{ translateResult }}</div>
        <!--翻译结果音标-->
        <div class="translate-result-phonetic">{{ translatePhonetic }}</div>
        <!--翻译结果底部控制栏（读音、复制、建议、分享）-->
        <div class="translate-result-contorl">
          <div
            class="material-icons translate-icons translate-icons-result-sound"
          >
            volume_up
          </div>
          <div class="material-icons translate-icons">content_copy</div>
          <svg
            focusable="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="translate-icons-result-thumbs"
          >
            <path
              d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm-2 1.13L7.92 12H2V6.21l1.93-1.93L3.36 7H10v.13zM22.5 10h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5zm-.5 7.79l-1.93 1.93.57-2.72H14v-.13L16.08 12H22v5.79z"
            ></path>
          </svg>
          <div class="material-icons translate-icons">share</div>
        </div>
      </div>
    </div>
    <!--发送反馈-->
    <div class="translate-feedback">发送反馈</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EditableDiv } from "../components";
export default defineComponent({
  components: {
    ediv: EditableDiv,
  },
  data() {
    return {
      origin: "",
      maxlength: 5000,
      wordsPlaceholder: "输入文字",
      wordsTranslate: "翻译",
      originalLangauge: "英语",
      resultLangaue: "中文（简体）",
      detectLabel: "源语言：",
      detectResult: "威尔士语",
      translateResult: "今日头条",
      translatePhonetic: "sDaysssssssssssssssssssssssssssssssss",
    };
  },
  computed: {
    originLength() {
      return (this as any).origin.length;
    },
  },
  methods: {
    /**
     * 千分位逗号数字格式化
     */
    convertNumberToString(num: number): string {
      let ret = num.toString();
      let index = ret.length % 3;
      let map = [ret.slice(0, index)];
      for (let i = index; i < ret.length; i += 3) {
        map.push(ret.slice(i, i + 3));
      }
      return map.join(",");
    },
  },
});
</script>

<style>
.translate {
  background: #f5f5f5;
  min-height: 100vh;
  font-size: 0;
}
.translate-header {
  background: #fff;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
}
.translate-setting-bar {
  height: 2px;
  background: #5f6368;
  margin-top: 3px;
  width: 18px;
  margin-left: 23px;
}
.translate-setting-first-bar {
  margin-top: 0;
}
.translate-title {
  font-size: 20px;
  font-family: Spartan;
  color: #63676c;
  margin-left: 18px;
}
.translate-title-content {
  font-size: 22px;
}
span.g1 {
  color: #4285f4;
}
span.o1 {
  color: #ea4335;
}
span.o2 {
  color: #fbbc05;
  letter-spacing: -1px;
}
span.g2 {
  color: #4285f4;
  letter-spacing: -2px;
}
span.l {
  color: #34a853;
  letter-spacing: -1px;
}
span.e {
  color: #ea4335;
  display: inline-block; /*设置元素旋转*/
  transform: rotate(-15deg);
  letter-spacing: 4px;
}
@font-face {
  font-family: "Spartan";
  src: url("/res/fonts/Spartan-SemiBold.ttf");
}
.translate-others {
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-left: auto;
  margin-right: 22px;
}
.translate-others-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.translate-other-point {
  width: 4px;
  height: 4px;
  background: #5f6368;
  border-radius: 50%;
}
.translate-language {
  background: #fff;
  height: 49px;
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-left: 0px;
  border-right: 0px;
  box-sizing: border-box;
}
.translate-selection {
  flex-basis: 100%;
  color: #6473e8;
  font-size: 14px;
}
.translate-icon {
  color: #5f6368;
}
.translate-origin-area {
  background: #fff;
  position: relative;
}
.translate-textarea-input {
  border: 0 none;
  font-size: 24px;
  padding: 16px 88px 16px 16px;
  min-height: 80px;
  box-sizing: border-box;
}
.translate-feedback {
  font-size: 12px;
  float: right;
  font-style: italic;
  color: #5f6368;
  margin: 5px 12px;
}
.translate-textarea-control {
  height: 53px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.translate-voice-input {
  margin-left: 12px;
  margin-right: 12px;
  color: #5f6368;
}
.translate-words-count {
  font-size: 12px;
  color: #747471;
  margin-left: auto;
  margin-right: 14px;
}
.translate-input-menu-item {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.translate-do-translate {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1a73e8;
  color: #fff;
}
.translate-input-menu {
  position: absolute;
  top: 5px;
  right: 0;
  display: flex;
  justify-content: right;
}
.translate-detect-area {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 16px;
}
.translate-detect-text {
  display: flex;
  align-items: center;
  font-size: 16px;
  flex-wrap: wrap;
}
.translate-detect-icon {
  color: #1a73e8;
  margin-left: 16px;
  margin-right: 16px;
}
.translate-detect-label {
  margin-right: 4px;
}
.translate-detect-result {
  color: #1a73e8;
}
.translate-area {
  box-shadow: 0px 1px 2px 1px #b9b9b9;
  width: 100%;
}
.translate-result-area {
  background: #1a73e8;
  color: #fff;
  width: 100%;
}
.translate-result-text {
  font-size: 24px;
  text-align: left;
  padding: 16px 48px 16px 16px;
}
.translate-result-phonetic {
  font-size: 14px;
  padding: 1px 16px;
  text-align: left;
}
.translate-result-contorl {
  padding: 0 0 4px 6px;
  text-align: right;
}
.translate-icons {
  padding: 12px;
}
.translate-icons-result-sound {
  float: left;
}
.translate-icons-result-thumbs {
  fill: #fff;
  padding: 0 12px;
}
</style>