<template>
  <div
    class="pea-editable-div"
    contenteditable="true"
    :placeholder="placeholder"
    @input="handleInput($event)"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput(event: InputEvent) {
      const target = event.target as HTMLInputElement;
      const value = target.innerText;
      this.$emit("update:modelValue", value);
    },
  },
  watch: {
    modelValue(value: string) {
      if (this.$el.innerText !== value) {
        this.$el.innerText = value;
      }
    },
  },
});
</script>

<style>
.pea-editable-div {
  background: #fff;
  outline: 0;
  text-align: left;
  -webkit-user-modify: read-write-plaintext-only;
}
.pea-editable-div:empty:before {
  content: attr(placeholder);
  color: #75757e;
  font-size: 23px;
}
.pea-editable-div:focus:before {
  content: none;
}
</style>