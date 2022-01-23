<!-- 用户信息页 -->
<template>

  <div>
    <TopBar></TopBar>

    <el-container style="height: 660px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="[ '3']" :router="true">
          <!-- 导航1 ： 交易流程部分-->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>信息Message</template>
            <el-menu-item-group>

            </el-menu-item-group>
          </el-submenu>
          <!-- 导航2 ： 物品操作部分-->
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>管理闲置物品</template>
            <el-menu-item-group>

            </el-menu-item-group>
          </el-submenu>
          <!-- 导航3 : 用户信息部分 -->
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>个人信息管理</template>
            <el-menu-item-group>
              <!-- <el-menu-item index="/account_information/deleteUserPage">注销账号</el-menu-item> -->
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
// import TopBar from '@/components/homeComponents/TopBar';


export default {
  name: 'AccountInformation',
  components: {
    // 'TopBar': TopBar,
  },
  data () {
    const item = {
      date: '2016-05-02',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(5).fill(item),
      user: {
        username: '访问错误！'
      }
    }
  },



  // activated () {
  created () {

    // console.log("=====进入if前=====")

    console.log(this.$store.getters.getUser.username)

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
