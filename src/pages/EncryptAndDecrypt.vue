<template>
  <div>
    <van-field
      v-model="beforeString"
      rows="1"
      autosize
      label="转换前"
      type="textarea"
    ></van-field>
    <van-field
      v-model="afterString"
      rows="1"
      autosize
      label="转换前"
      type="textarea"
    />
    <van-button @click="encrypt" type="primary">中缀表达式转后缀表达式</van-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import * as algorithm from "../utils/algorithm";
import { Field, Button } from "vant";
export default defineComponent({
  components: {
    "van-field": Field,
    "van-button": Button,
  },
  data() {
    return {
      beforeString: "",
      afterString: "",
    };
  },
  methods: {
    encrypt() {
      const array = this.beforeString.split(",");
      const temp = [];
      for (const item of array) {
        if (item === "null") {
          temp.push(null);
        } else {
          temp.push(parseInt(item));
        }
      }
      console.log(algorithm.getTreeNodeByPreorderArray(temp));
    },
  },
});
</script>

<style scoped>
</style>