<!-- 用户信息修改页面 -->
<template>
  <div>

    <!-- <div>
      <el-table :data="tableData" border style="width: 75%; align:center">
        <el-table-column prop="createLevel" label="用户组" width="65">
        </el-table-column>
        <el-table-column prop="username" label="用户名（昵称）" width="198">
        </el-table-column>
        <el-table-column prop="studentId" label="学生证号" width="140">
        </el-table-column>
        <el-table-column prop="phoneNum" label="联系电话" width="155">
        </el-table-column>
        <el-table-column prop="onlineContact" label="网络联系方式" width="220">
        </el-table-column>
        <el-table-column prop="updateTime" label="上次操作时间" width="155">
        </el-table-column>
      </el-table>
    </div>-->

    <!-- 消息提示 -->
    <!-- <br>
    <br>
    <hr>
    <br>  -->

    <el-card class="box-card">
      <div>
        <span style="font-size: 30px">注意事项：</span>
        <li v-for="doc in docx" :key="doc.id">
          {{ doc }}
        </li>
      </div>
    </el-card>

    <!-- 表单部分操作 -->
    <div style="float: right; width:50%; margin: -270px 30px 0px 0px;">
      <span style="font-size: 20px">修改表单</span>
      <br>
      <br>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学生证号" prop="studentId">
          <el-input type="text" v-model="ruleForm.studentId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneNum">
          <el-input v-model.number="ruleForm.phoneNum" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网络联系方式" prop="onlineContact">
          <el-input v-model.number="ruleForm.onlineContact" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "UpdateUserInfoPage",

  data () {

    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validateStuId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入学生证号"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入联系电话"));
      } else {
        callback();
      }
    };
    var validateOnline = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入在线联系方式"));
      } else {
        callback();
      }
    };

    return {
      tableData: null,
      docx: [
        '1. 用户信息修改时请勿随意删除表格中回写的信息，以防信息丢失而失去你所有的证明方式'
      ],
      //表单
      ruleForm: {
        id: '',
        username: '',
        studentId: '',
        phoneNum: '',
        onlineContact: '',
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在3到18个字符", trigger: "blur" },
          { validator: validateUser, trigger: "blur" },
        ],
        studentId: [
          {
            pattern: /^1{1,2}\d{9}$/,
            message: "长度为10的学号",
            trigger: "blur"
          },
          { required: true, message: '请输入学生证号', trigger: 'blur' },
          { validator: validateStuId, trigger: "blur" },
        ],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: "手机号格式不对",
            trigger: "blur",
          },
          { validator: validatePhone, trigger: "blur" },
        ],
        onlineContact: [
          { required: true, message: '请输入QQWeChat或者邮箱号', trigger: 'blur' },
          { validator: validateOnline, trigger: "blur" },
        ]
      },
    }

  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/user/updateInfo', this.ruleForm, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            console.log(res)
            _this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/account_information/updateUserInfoPage")
              }
            });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  },





  created () {

    const _this = this

    this.ruleForm.id = this.$store.getters.getUser.id
    this.ruleForm.username = this.$store.getters.getUser.username
    this.ruleForm.studentId = this.$store.getters.getUser.stuId
    this.ruleForm.phoneNum = this.$store.getters.getUser.phoneNum
    this.ruleForm.onlineContact = this.$store.getters.getUser.onlineContact


    this.$axios.get('/user/root/queryAllUser?currentPage=1&pageSize=1&studentId=' + this.$store.getters.getUser.stuId + '').then(function (resp) {

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
  width: 480px;
}

.time {
  font-size: 13px;
  color: #999;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>