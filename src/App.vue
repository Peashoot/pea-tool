<template>
  <float-icon class="icons-warp">
    <div class="float-icon-item">
      <van-icon name="/res/images/home.png" @click="routeTo('/')" />
    </div>
    <div class="float-icon-divide-line"></div>
    <div class="float-icon-item">
      <van-icon name="/res/images/login.png" @click="showLogin = true" />
    </div>
  </float-icon>
  <router-view />
  <van-overlay :show="showLogin" @click="showLogin = false">
      <pea-login  @click.stop/>
  </van-overlay>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { FloatIcon } from "./components";
import { Icon, Overlay } from "vant";
import { Authorization } from "./pages";

export default defineComponent({
  data() {
    return {
      showLogin: false,
    };
  },
  components: {
    "float-icon": FloatIcon,
    "van-icon": Icon,
    "van-overlay": Overlay,
    "pea-login": Authorization,
  },
  methods: {
    routeTo(path: string) {
      this.$router.push(path);
    },
  },
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  --van-overlay-z-index: 100;
}
body {
  margin: 0;
}
.icons-warp {
  border-radius: 25px;
  .float-icon-divide-line {
    height: 5px;
    width: 100%;
  }
  .float-icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    box-shadow: 1px 1px 3px #4a4a4a;
    img {
      width: 25px;
      height: 25px;
      margin-bottom: 3px;
    }
    span {
      font-size: 9px;
      color: #666666;
    }
  }
}
.van-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
