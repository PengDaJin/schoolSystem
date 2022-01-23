<!-- 展示首页 -->
<template>
  <div class="index-page">
    <el-button type="danger" @click="logout">注销登陆</el-button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import TopBar from '@/components/homeComponents/TopBar'

export default {
  name: "Home.vue",
  //import引入的组件需要注入到对象中才能使用
  data () {
    return {}
  },

  methods: {
    logout () {
      const _this = this
      _this.$axios.get("/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")

      })
    }
  },

  components: {
    // 'TopBar': TopBar,
  }
};
</script>
<style lang="less" scoped>
.index-page {
  .gray-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    background-color: #f5f5f5;
  }
}
</style>