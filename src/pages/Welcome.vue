<template>
  <div class="welcome">
    <div class="welcome-title-fixed">
      <div class="welcome-title">{{ title }}</div>
    </div>
    <div class="welcome-title-placeholder"></div>
    <van-grid
      class="welcome-menu-grid"
      column-num="2"
      icon-size="4rem"
      gutter="1rem"
    >
      <van-grid-item
        class="welcome-menu-grid-item"
        v-for="item in RouteMap"
        @click="clickToJump(item)"
        :key="item"
        :icon="item.icon"
        :text="item.name"
      ></van-grid-item>
    </van-grid>
    <div class="welcome-foot-placeholder"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Grid, GridItem } from "vant";
export default defineComponent({
  setup() {
    return {
      title: "Peashoot",
      /**
       * 路由字典
       */
      RouteMap: new Array<RouteInfo>(),
    };
  },
  created() {
    this.RouteMap = [
      {
        external: true,
        path: "https://oneword.peashoot.xyz",
        icon: "/res/images/oneword.png",
        name: "一言",
      },
      {
        path: "/wow",
        icon: "/res/images/wow.png",
        name: "Wake on WAN",
      },
      {
        path: "/fund",
        icon: "/res/images/fund.png",
        name: "实时基金",
      },
      {
        external: true,
        path: "https://2048.peashoot.xyz",
        icon: "/res/images/2048.png",
        name: "2048",
      },
      {
        path: "/translate",
        icon: "/res/images/translate.png",
        name: "翻译",
      },
      {
        path: "/speech",
        icon: "/res/images/speech.png",
        name: "语音合成",
      },
      {
        path: "/junkmail",
        icon: "/res/images/junkmail.png",
        name: "垃圾邮箱",
      },
      {
        external: true,
        path: "https://snapdrop.peashoot.xyz",
        icon: "/res/images/snapdrop.png",
        name: "Snapdrop",
      },
      {
        external: true,
        path: "https://pan.peashoot.xyz",
        icon: "/res/images/netdisk.png",
        name: "网盘",
      },
      {
        path: "/qrcode",
        icon: "/res/images/qrcode.png",
        name: "二维码解析",
      },
      {
        path: "/encrypt",
        icon: "/res/images/encrypt.png",
        name: "加解密",
      },
      {
        path: "/about",
        icon: "/res/images/about.png",
        name: "关于",
      }
    ];
  },
  components: {
    "van-grid": Grid,
    "van-grid-item": GridItem,
  },
  methods: {
    clickToJump(routeInfo: RouteInfo) {
      if (routeInfo.external) {
        window.location.href = routeInfo.path;
      } else {
        this.$router.push(routeInfo.path);
      }
    },
  }
});
/**
 * 路由详情
 */
interface RouteInfo {
  /**
   * 外部的路由
   */
  external?: boolean;
  /**
   * 路由名称
   */
  name?: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 路由描述
   */
  description?: string;
  /**
   * 跳转路由
   */
  path: string;
}
</script>

<style scoped>
.welcome-title-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
.welcome-title-placeholder {
  width: 100%;
  height: 5.8rem;
  position: relative;
}
.welcome-foot-placeholder{
  width: 100%;
  height: 1rem;
}
.welcome-title {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 0;
  margin-top: 0;
  line-height: 1;
  text-decoration: none;
  color: #fff;
  font-family: pacifico;
  animation: neon3 1.5s ease-in-out infinite alternate;
  position: relative;
  margin: 0.9rem 0;
}
.welcome-title::before {
  content: "";
  position: absolute;
  width: calc(100%);
  height: calc(160%);
  z-index: -1;
  background-image: linear-gradient(
    60deg,
    aquamarine,
    cornflowerblue,
    goldenrod,
    hotpink,
    salmon,
    lightgreen,
    sandybrown,
    violet
  );
  background-size: 300%;
  animation: animate-bg 6s infinite;
}
.welcome-title::after {
  content: "";
  position: absolute;
  width: calc(97%);
  height: calc(140%);
  z-index: -1;
  background-color: #222222;
  background: repeating-linear-gradient(
      45deg,
      #2b2b2b 0%,
      #2b2b2b 10%,
      #222222 0%,
      #222222 50%
    )
    0 / 15px 15px;
}
@font-face {
  font-family: pacifico;
  src: url("/res/fonts/pacifico.ttf");
}
@keyframes neon3 {
  from {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ffdd1b,
      0 0 35px #ffdd1b, 0 0 40px #ffdd1b, 0 0 50px #ffdd1b, 0 0 75px #ffdd1b;
  }
  to {
    text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 7px #fff, 0 0 10px #ffdd1b,
      0 0 17px #ffdd1b, 0 0 20px #ffdd1b, 0 0 25px #ffdd1b, 0 0 37px #ffdd1b;
  }
}
@keyframes animate-bg {
  0%,
  10% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}
.welcome-menu-grid {
  --van-grid-item-text-font-size: 1rem;
}
</style>
<style>
.welcome-menu-grid-item > .van-hairline {
  box-shadow: 2px 2px 5px #4a4a4a;
}
</style>