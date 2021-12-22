<template>
  <div class="about">
    <h1>海蓝时见鲸</h1>
    <div class="about-background">
      <whale-bg :opacity="0.2"></whale-bg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WhaleBackground } from "@/components";
export default defineComponent({
  components: {
    "whale-bg": WhaleBackground,
  },
});
</script>

<style scoped>
.about-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
