<template>
  <div class="rj-content-box">
    <div class="tip" v-if="isTip" :style="`background: ${color};`"></div>
    <slot name="title">
      <div class="title" v-if="title">
        {{ title }}
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "rj-content-box",
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
.rj-content-box {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 5px 11px 24px rgba(0, 0, 0, 0.15);
  padding: 20px 26px 0px 26px;
  position: relative;
  height: 120px;
  margin-bottom: 25px;
  .tip {
    width: 4px;
    height: 18px;
    background: #666ee8;
    position: absolute;
    left: 0;
    top: 22px;
  }
  .title {
    padding-left: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    padding-bottom: 15px;
    line-height: 24px;
    text-align: left;
  }
}
</style>
