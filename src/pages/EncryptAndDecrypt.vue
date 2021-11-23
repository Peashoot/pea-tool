<template>
  <div>
    <input type="text" name="infix" id="infix" v-model="infix" />
    <input type="text" v-model="postfix" />
    <button @click="encrypt">中缀表达式转后缀表达式</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import * as algorithm from "../utils/algorithm";
export default defineComponent({
  data() {
    return {
      infix: "",
      postfix: "",
    };
  },
  methods: {
    encrypt() {
      this.postfix = algorithm.getPostfixExpression(this.infix);
    },
  },
});
</script>

<style scoped>
</style>