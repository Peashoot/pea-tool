<template>
  <div class="translate">
    <div class="translate-header">
      <div class="translate-setting">
        <div class="translate-setting-bar translate-setting-first-bar"></div>
        <div class="translate-setting-bar"></div>
        <div class="translate-setting-bar"></div>
      </div>
      <div class="translate-title">
        <span class="g1">G</span>
        <span class="o1">o</span>
        <span class="o2">o</span>
        <span class="g2">g</span>
        <span class="l">l</span>
        <span class="e">e</span>
        <span class="translate-title-content">翻译</span>
      </div>
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
    <div class="translate-language">
      <span class="translate-selection">英语</span>
      <span class="material-icons translate-icon">swap_horiz</span>
      <span class="translate-selection">中文（简体）</span>
    </div>
    <div class="translate-origin">
      <ediv
        class="translate-textarea-input"
        placeholder="输入文字"
        v-model="origin"
      ></ediv>
      <div class="translate-input-menu">
        <div class="translate-input-menu-item">
          <div class="translate-do-translate">
            <div class="material-icons">arrow_forward</div>
          </div>
        </div>
        <div class="translate-input-menu-item">
          <div class="translate-do-truncate">
            <div class="material-icons">close</div>
          </div>
        </div>
      </div>
      <div class="translate-textarea-control">
        <div class="material-icons translate-voice-input">mic</div>
        <div class="material-icons translate-voice-input">volume_up</div>
        <div class="translate-words-count">
          {{ originLength }} / {{ convertNumberToString(maxlength) }}
        </div>
      </div>
    </div>
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
  width: 100%;
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
.translate-origin {
  position: relative;
  box-shadow: 0px 1px 2px 1px #b9b9b9;
}
.translate-textarea-input {
  width: 100%;
  border: 0 none;
  font-size: 23px;
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
  background: #fff;
  width: 100%;
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
</style>