<template>
  <div class="about">
    <h1>This is an about page</h1>
    <whale-bg></whale-bg>
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
