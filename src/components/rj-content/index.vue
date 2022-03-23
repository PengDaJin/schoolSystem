<template>
  <div class="rj-content">
    <slot name="title"> </slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "rj-content",
  props: {
    title: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    isTip: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.rj-content {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 5px 11px 24px rgba(47, 47, 47, 0.15);
  padding: 26px;
  position: relative;
  
  margin: -10px;
}
</style>
