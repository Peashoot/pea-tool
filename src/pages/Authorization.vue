<template>
  <!--div class="login-overlay"-->
  <div class="login-form">
    <div class="login-valid-area">
      <div class="login-input-area">
        <div class="login-title">打开新世界的大门</div>
        <!--分割线-->
        <div class="login-divide-line"></div>
        <div class="login-username-area">
          <i
            :class="[
              'fa',
              'fa-user',
              'login-icon',
              { 'login-icon-focus': unFocus },
            ]"
          />
          <input
            :class="[
              'login-input',
              'login-username-input',
              { 'login-input-focus': unFocus },
            ]"
            type="text"
            placeholder="用户名"
            @focus="unFocus = true"
            @blur="unFocus = false"
            maxlength="20"
            autofocus
          />
        </div>
        <div class="login-password-area">
          <i
            :class="[
              'fa',
              'fa-key',
              'login-icon',
              { 'login-icon-focus': pwFocus },
            ]"
          ></i>
          <input
            :class="[
              'login-input',
              'login-password-input',
              { 'login-input-focus': pwFocus },
            ]"
            type="password"
            placeholder="密码"
            @focus="pwFocus = true"
            @blur="pwFocus = false"
            maxlength="20"
            autofocus
          />
        </div>
        <div class="login-forget-link">密码忘记了?</div>
      </div>
      <div class="login-submit-button" @click="login">登录</div>
      <div
        :class="['login-status-box', { 'login-status-box-show': showStatus }]"
        :style="{ 'background-color': statusBackColor }"
      >
        <div>
          <i
            :class="['fa', statusIconClass, { 'fa-spin': shouldSpin }, 'fa-3x']"
          ></i>
          <div class="status-text">{{ status }}</div>
        </div>
      </div>
    </div>
    <div
      class="login-form-foot"
      :style="{ 'background-color': footBackColor }"
    ></div>
  </div>
  <!--/div-->
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CryptoJS from "crypto-js";
export default defineComponent({
  props: {
    userToken: {
      type: String,
      default: "",
    },
    userAvatar: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      username: "",
      password: "",
      unFocus: false,
      pwFocus: false,
      showStatus: false,
      status: "",
      statusBackColor: "#2196f3",
      statusIconClass: "fa-circle-o-notch",
      footBackColor: "#1e87da",
    };
  },
  emits: [
    "loginSuccess",
    "loginFailed",
    "update:userToken",
    "update:userAvatar",
  ],
  computed: {
    pdHash() {
      return CryptoJS.MD5((this as any).password).toString();
    },
    shouldSpin() {
      return (this as any).statusIconClass === "fa-circle-o-notch";
    },
  },
  methods: {
    clearInput() {
      this.username = "";
      this.password = "";
    },
    login() {
      this.showStatus = true;
      this.status = "身份校验中";
      let data = this.$data;
      let self = this;
      setTimeout(() => {
        const result = Math.random() > 0.5;
        if (result) {
          // 登录成功
          data.status = "欢迎回来！";
          data.statusBackColor = "#8bc34a";
          data.footBackColor = "#7daf42";
          data.statusIconClass = "fa-check";
          self.$emit("update:userToken", "just for test!!!");
          self.$emit(
            "update:userAvatar",
            "https://img.zcool.cn/community/011c705e835463a80120a8955cad48.jpg@1280w_1l_2o_100sh.jpg"
          );
        } else {
          // 登录失败
          data.password = "";
          data.status = "请检查输入是否正确！";
          data.statusBackColor = "#F36759";
          data.footBackColor = "#DF5648";
          data.statusIconClass = "fa-close";
        }
        setTimeout(() => {
          data.showStatus = false;
          data.statusBackColor = "#2196f3";
          data.footBackColor = "#1e87da";
          data.statusIconClass = "fa-circle-o-notch";
          if (result) {
            this.$emit("loginSuccess");
          } else {
            this.$emit("loginFailed");
          }
        }, 1500);
      }, 1500);
    },
  },
});
</script>

<style scoped>
.login-overlay {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 90%;
  max-width: 320px;
  height: 315px;
  background-color: #fff;
  border: 0px solid #e5e5e5;
  border-radius: 3px;
  position: relative;
}
* {
  box-sizing: border-box;
}
.login-input-area {
  margin: 0 22px;
  text-align: left;
}
.login-title {
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
}
.login-divide-line {
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
  background: rgba(0, 0, 0, 0.12);
}
.login-username-area {
  position: relative;
  margin-top: 30px;
}
.login-icon {
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  visibility: hidden;
  color: #fff;
}
.login-icon-focus {
  animation: icon-focus-change 0.25s linear 0s 1 normal forwards;
}
@keyframes icon-focus-change {
  from {
    visibility: visible;
    width: 15px;
  }
  to {
    width: 30px;
    background: #2196f3;
    visibility: visible;
  }
}
.login-password-area {
  position: relative;
  margin-top: 10px;
}
.login-input {
  font-size: 18px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 2px;
  color: #ccc;
  padding: 15px 10px;
  ime-mode: disabled;
}
.login-input-focus {
  animation: input-focus-change 0.2s linear 0s 1 normal forwards;
  border-color: #2196f3;
  color: #000;
}
@keyframes input-focus-change {
  from {
    border-color: #ddd;
    color: #ccc;
  }
  to {
    border-color: #2196f3;
    color: #000;
    padding: 15px 10px 15px 40px;
  }
}
.login-forget-link {
  line-height: 40px;
  font-size: 14px;
  color: #2196f3;
}
.login-submit-button {
  margin: 10px 0 0 0;
  width: 100%;
  height: 55px;
  background-color: #2196f3;
  color: #fff;
  font-size: 18px;
  line-height: 55px;
  text-align: center;
}
.login-status-box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #2196f3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  visibility: hidden;
  font-size: 18px;
}
.login-status-box-show {
  animation: status-show 0.2s linear 0s 1 normal forwards;
}
@keyframes status-show {
  from {
    height: 55px;
    visibility: visible;
  }
  to {
    height: 100%;
    visibility: visible;
  }
}
.status-text {
  margin-top: 20px;
}
.login-form-foot {
  content: "";
  display: block;
  width: 100%;
  height: 4px;
  background: #1e87da;
  transform: translateY(-1px);
}
</style>