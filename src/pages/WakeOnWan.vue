<template>
  <div class="wake-on-wan">
    <div class="wol-searchin-lan">
      <i class="fa fa-wifi"></i>
    </div>
    <div class="wol-submit-form">
      <div>
        <img src="/res/images/wow.png" class="wol-submit-logo" />
      </div>
      <div class="wol-submit-title">MAC地址：</div>
      <div class="wol-submit-warning">格式：00:00:00:00:00:00</div>
      <input
        :class="['wol-submit-input', { 'wol-submit-input-error': isWrongMac }]"
        type="text"
        v-model="mac"
        @focus="$event.target.select()"
      />
      <div class="wol-submit-title">域名/IP：</div>
      <div class="wol-submit-warning">例如：home.peashoot.xyz</div>
      <input
        :class="['wol-submit-input', { 'wol-submit-input-error': isWrongHost }]"
        type="text"
        v-model="host"
        @focus="$event.target.select()"
      />
      <div class="wol-submit-title">端口号：</div>
      <div class="wol-submit-warning">取值：1 - 65535</div>
      <input
        :class="['wol-submit-input', { 'wol-submit-input-error': isWrongPort }]"
        type="number"
        max="65535"
        min="1"
        v-model="port"
        @focus="$event.target.select()"
      />
      <div class="wol-submit-title">IP协议：</div>
      <div class="wol-submit-input wol-sumbit-radio-container">
        <input
          class="wol-submit-radio"
          type="radio"
          name="rdoIPVersion"
          value="1"
          v-model="ipVersion"
        />
        <span class="wol-submit-radio-text" @click="ipVersion = '1'">IPv4</span>
        <input
          class="wol-submit-radio"
          type="radio"
          name="rdoIPVersion"
          value="2"
          v-model="ipVersion"
        />
        <span class="wol-submit-radio-text" @click="ipVersion = '2'">IPv6</span>
      </div>
      <button class="wol-submit-button">唤醒</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  data() {
    return {
      mac: "",
      host: "",
      port: 80,
      ipVersion: "1",
    };
  },
  computed: {
    /**
     * 是错误的MAC地址
     */
    isWrongMac() {
      return !/^\s*([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}\s*$/.test(
        (this as any).mac
      );
    },
    /**
     * 是错误的域名或IP地址
     */
    isWrongHost() {
      return !/^\s*([0-9a-zA-Z]{1,}[.]{1}){1,}[0-9a-zA-Z]{1,}\s*$/.test(
        (this as any).host
      );
    },
    /**
     * 是错误的端口号
     */
    isWrongPort() {
      const port = (this as any).port;
      return port > 65535 || port < 1;
    },
  },
  methods: {},
});
</script>

<style scoped>
.wol-searchin-lan {
  float: right;
}
.wol-submit-form {
  position: fixed;
  width: 280px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.wol-submit-logo {
  width: 60px;
  height: 60px;
  margin: 5px;
}
.wol-submit-title {
  float: left;
  margin: 7px 0;
  margin-top: 11px;
}
.wol-submit-warning {
  float: right;
  margin: 7px 0;
  margin-top: 16px;
  font-size: 10px;
  color: #1989fa;
}
.wol-submit-input {
  width: 100%;
  padding: 5px 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.wol-submit-input::selection {
  background: #3390fc;
  color: #fff;
}
.wol-submit-input-error {
  border: 1px solid #ee0a24;
}
.wol-sumbit-radio-container {
  display: flex;
  justify-content: left;
}
.wol-submit-radio {
  margin-right: 8px;
  transform: translateY(-1px);
}
.wol-submit-radio-text {
  margin-right: 64px;
}
.wol-submit-button {
  margin: 18px;
  padding: 10px 40px;
  box-sizing: border-box;
  border-width: 0;
  border-radius: 5px;
  background-color: #1989fa;
  color: #fff;
  cursor: pointer;
  line-height: 16px;
}
</style>