<!-- 用户信息编辑页 -->
<template>
  <div>
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
              <!-- <el-menu-item index="/accInfo/productInfoPage">货架操作</el-menu-item> -->
              <el-menu-item index="/user/listx">货架操作</el-menu-item>
              <el-menu-item index="/user/list">用户信息列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 导航3 : 用户信息部分 -->
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-user"></i>个人信息</template>
            <el-menu-item-group>
              <el-menu-item index="/user/updateUser">修改信息</el-menu-item>
              <el-menu-item index="/user/updatePassword">修改密码</el-menu-item>
              <el-menu-item index="/user/deleteUser">注销账号</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>

        <el-header style="text-align: left; font-size: 12px">
          <span>用户：{{ user.username }}</span>
          <!-- <el-button type="danger" @click="logout">注销登陆</el-button> -->
        </el-header>

        <el-main>
          <router-view />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import UpdateUserInfoPage from '@/components/userInfo/UpdateUserInfo'
import UpdateUserPwdPage from '@/components/userInfo/UpdateUserPwd';
import DeleteUserPage from '@/components/userInfo/DeleteUser';

export default {
  name: 'User',
  components: {
    UpdateUserInfoPage,
    UpdateUserPwdPage,
    DeleteUserPage
  },
  data () {
    return {
      user: {
        username: 'error!'
      }
    }
  },

  created () {

    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username

      this.hasLogin = true
    }
  }
}
</script>
<style lang='less' scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-dropdown {
  font-size: 20px;
}
span {
  font-weight: 700;
  font-size: medium;
  margin-right: 10px;
}
</style>
