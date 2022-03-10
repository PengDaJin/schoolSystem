<!-- 展示首页 -->
<template>
  <div class="index-page">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu style="height:99.8vh" :default-openeds="['1','2','3']" :router="true">
          <!-- 导航1 ： 交易流程部分-->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>易物信息</template>
            <el-menu-item-group>
              <el-menu-item index="/accInfo/swapApplyPage">易物申请</el-menu-item>
              <el-menu-item index="/accInfo/transactionProgressPage">易物进度</el-menu-item>
              <el-menu-item index="/accInfo/appealProgressPage">申诉进度</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 导航2 ： 物品操作部分-->
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-goods"></i>物品操作</template>
            <el-menu-item-group>
              <el-menu-item index="/accInfo/addProductPage">新增物品</el-menu-item>
              <el-menu-item index="/accInfo/productInfoPage">货架操作</el-menu-item>
              <el-menu-item index="/accInfo/delProductPage">删除物品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 导航3 : 用户信息部分 -->
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-user"></i>个人信息</template>
            <el-menu-item-group>
              <el-menu-item index="/accInfo/updateUserInfoPage">修改信息</el-menu-item>
              <el-menu-item index="/accInfo/updateUserPwdPage">修改密码</el-menu-item>
              <el-menu-item index="/accInfo/deleteUserPage">注销账号</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>

        <el-header style="text-align: left; font-size: 12px">
          <span>用户：{{ user.username }}</span>
        </el-header>

        <el-main>
          <router-view />
        </el-main>

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
  height: 100vh;
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