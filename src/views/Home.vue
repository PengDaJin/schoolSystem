<!-- 展示首页 -->
<template>
  <div class="index-page">
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          style="height:100%"
          :default-openeds="['1', '2', '3']"
          :router="true"
        >
          <h4 style="line-height: 40px;">教室信息管理系统</h4>
          <!-- 导航1 ： 交易流程部分-->
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>便捷校园</template
            >
            <el-menu-item-group>
              <el-menu-item index="/convenientCampus/roomap"
                >教室预约</el-menu-item
              >
              <el-menu-item v-if="role < 2" index="/convenientCampus/timeinfo"
                >学校课程时间</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <!-- 导航2 ： 物品操作部分-->
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-goods"></i>综合信息</template
            >
            <el-menu-item-group>
              <el-menu-item v-if="role < 2" index="/inforMation/user"
                >用户信息</el-menu-item
              >
              <el-menu-item index="/inforMation/lessoninfo"
                >课程信息</el-menu-item
              >
              <el-menu-item index="/inforMation/classinfo"
                >班级信息</el-menu-item
              >
              <el-menu-item v-if="role < 2" index="/inforMation/roominfo"
                >教室信息</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <!-- 导航3 : 用户信息部分 -->
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-user"></i>个人信息</template
            >
            <el-menu-item-group>
              <el-menu-item index="/userInfo/updateUser">修改信息</el-menu-item>
              <el-menu-item index="/userInfo/updatePassword"
                >修改密码</el-menu-item
              >
              <el-menu-item index="/userInfo/deleteUser">注销账号</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 12px">
          <span>用户：{{ home.homename }}</span>
          <el-button type="danger" @click="logout">注销登陆</el-button>
        </el-header>

        <el-main>
          <keep-alive>
            <router-view />
          </keep-alive>
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
  data() {
    return {
      role: 0,
      // tableData: Array(5).fill(item),
      home: {
        homename: "访问错误！",
      },
    };
  },

  methods: {
    logout() {
      const _this = this;
      _this.$axios
        .get("/logout", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          _this.$store.commit("REMOVE_INFO");
          _this.$router.push("/login");
        });
    },
  },
  created() {
    // this.role = this.$store.getters.getUser.role;
    console.log("_this.role:", this.role);
    if (this.$store.getters.getUser.username) {
      this.home.homename = this.$store.getters.getUser.username;

      this.hasLogin = true;
    }
  },

  components: {
    // 'TopBar': TopBar,
  },
};
</script>
<style lang="less" scoped>
.index-page {
  height: 100vh;
  .gray-page {
    display: flex;
    flex-direction: column;
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
  background-color: rgb(255, 255, 255) !important;
  // text-align: center;
  // line-height: 160px;
  height: 92.4vh;
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
