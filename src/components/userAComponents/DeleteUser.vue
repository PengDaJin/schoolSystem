<!-- 注销账户 -->
<template>
  <div>
    <template>
      <el-table :data="tableData" border style="width: 100%; align:center">
        <el-table-column prop="createLevel" label="用户组" width="100">
        </el-table-column>
        <el-table-column prop="username" label="用户名（昵称）" width="180">
        </el-table-column>
        <el-table-column prop="studentId" label="学生证号" width="120">
        </el-table-column>
        <el-table-column prop="phoneNum" label="联系电话" width="120">
        </el-table-column>
        <el-table-column prop="onlineContact" label="网络联系方式" width="220">
        </el-table-column>
        <el-table-column prop="userkey" label="上架物品秘钥" width="110">
        </el-table-column>
        <el-table-column prop="createTime" label="账号创建时间" width="170">
        </el-table-column>
      </el-table>
    </template>

    <!-- 注销操作按钮 -->
    <br>
    <hr>
    <br>

    <el-card class="box-card">
      <div>
        <li v-for="doc in docx" :key="doc.id">
          {{ doc }}
        </li>

      </div>
      <!-- <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="danger">操作按钮</el-button>
      </div> -->
      <br>
      <span style="font-weight: bolder">点击注销按钮后默认用户同意以上条款</span>
      <hr>
      <br>
      <div class="bottom clearfix">
        <!-- <time class="time">{{ currentDate }}</time> &nbsp; -->
        <el-button type="danger" class="button" @click="open">注销账户</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'DeleteUserPage',

  data () {
    return {
      tableData: null,
      currentDate: new Date(),
      docx: [

      ]


    }
  },




  // 注销按钮
  methods: {
    open () {
      this.$confirm('此操作将注销该登录账户在本系统中的所有信息！ 是否继续?  (用户已认同相关条款)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/user/deletedUser/' + this.$store.getters.getUser.id + '');
        this.$message({
          type: 'success',
          message: '注销成功!'
        });


        const _this = this
        _this.$axios.get("/logout", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          _this.$store.commit("REMOVE_INFO")
          _this.$router.push("/login")

        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        });
      });
    }
  },





  created () {

    const _this = this

    this.$axios.get('/user/root/queryAllUser?currentPage=1&pageSize=1&studentId=' + this.$store.getters.getUser.stuId + '').then(function (resp) {

      // console.log(resp.data.data.records)

      _this.tableData = resp.data.data.records
    })
      .catch(err => {
        console.log(err)
      })
  },
}
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.time {
  font-size: 13px;
  color: #999;
}
</style>