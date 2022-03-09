<!-- 展示首页 -->
<template>
  <div class="index-page">
    <el-container>
      <el-header style="text-align: left; font-size: 12px">
        <span>用户：{{ user.username }}</span>
        <el-button type="danger" @click="logout">注销登陆</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
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
    return {
      // tableData: Array(5).fill(item),
      user: {
        username: '访问错误！'
      }
    }
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
  created () {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username

      this.hasLogin = true
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

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

span {
  font-weight: 700;
  font-size: medium;
  margin-right: 10px;
}
</style>