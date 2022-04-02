<!-- 用户信息修改页面 -->
<template>
  <div>
    <div>
      <el-card class="box-card" style="margin: 0 auto;">
        <div>
          <span style="font-size: 30px">注意事项：</span>
          <li v-for="doc in docx" :key="doc.id">
            {{ doc }}
          </li>
        </div>
      </el-card>
      <head-content-box
        style="height: 100%;padding-bottom: 25px;margin-top:25px"
        title="个人信息"
        color="#ff9149"
      >
        <el-descriptions title="" direction="vertical" :column="2" border>
          <el-descriptions-item label="用户名">{{
            tableData.username ? tableData.username : "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="真实姓名">{{
            tableData.realname ? tableData.realname : "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="学校证件号码">{{
            tableData.schoolCard ? tableData.schoolCard : "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{
            tableData.age ? tableData.age : "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{
            tableData.sex == 0 ? "男" : tableData.sex == 1 ? "女" : "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="管理员">{{
            tableData.role == 1 ? "老师" : tableData.role == 2 ? "同学" : "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{
            tableData.createTime ? tableData.createTime : "-"
          }}</el-descriptions-item>
          <el-descriptions-item label="修改时间">{{
            tableData.updateTime ? tableData.updateTime : "-"
          }}</el-descriptions-item>
        </el-descriptions>
      </head-content-box>
      <head-content-box style="height: 80px;" :isTip="false">
        <el-button
          type="primary"
          size="medium "
          @click="addOrUpdateHandle(scope.row.id)"
          >修改信息</el-button
        >
      </head-content-box>
    </div>

    <!-- 表单部分操作 -->
    <div style="float: right; width:50%; margin: 50px 25% 0px 0px;">
      <span style="font-size: 20px">修改表单</span>
      <br />
      <br />
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生证号" prop="studentId">
          <el-input
            type="text"
            v-model="ruleForm.studentId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneNum">
          <el-input
            v-model.number="ruleForm.phoneNum"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="网络联系方式" prop="onlineContact">
          <el-input
            v-model.number="ruleForm.onlineContact"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateUserInfoPage",

  data() {
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
      tableData: [],
      docx: [
        "1. 用户信息修改时请勿随意删除表格中回写的信息，以防信息丢失而失去你所有的证明方式",
      ],
      //表单
      ruleForm: {
        id: "",
        username: "",
        studentId: "",
        phoneNum: "",
        onlineContact: "",
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
            trigger: "blur",
          },
          { required: true, message: "请输入学生证号", trigger: "blur" },
          { validator: validateStuId, trigger: "blur" },
        ],
        phoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: "手机号格式不对",
            trigger: "blur",
          },
          { validator: validatePhone, trigger: "blur" },
        ],
        onlineContact: [
          {
            required: true,
            message: "请输入QQWeChat或者邮箱号",
            trigger: "blur",
          },
          { validator: validateOnline, trigger: "blur" },
        ],
      },
    };
  },

  activated() {
    this.getDataList();
    this.ruleForm.id = this.$store.getters.getUser.id;
    this.ruleForm.username = this.$store.getters.getUser.username;
    this.ruleForm.studentId = this.$store.getters.getUser.stuId;
    this.ruleForm.phoneNum = this.$store.getters.getUser.phoneNum;
    this.ruleForm.onlineContact = this.$store.getters.getUser.onlineContact;
  },
  methods: {
    sex(row) {
      if (row.sex == 0) {
        return "男";
      } else if (row.sex == 1) {
        return "女";
      } else {
        return "-";
      }
    },
    role(row) {
      if (row.role == 1) {
        return "老师";
      } else if (row.role == 2) {
        return "同学";
      } else {
        return "-";
      }
    },
    // 获取数据列表
    getDataList() {
      this.$axios
        .get(`/user/getUserById/${this.$store.getters.getUser.id}`)
        // this.$axios
        //   .get(`/user/getUserById?${this.$store.getters.getUser.id}`)

        //   "/user/root/queryAllUser?currentPage=1&pageSize=1&studentId=" +
        //     this.$store.getters.getUser.stuId +
        //     ""
        // )

        .then(({ data }) => {
          if (data && data.code === 200) {
            this.tableData = data.data;
            console.log(" _this.tableData:", this.tableData);
          } else {
            this.tableData[0] = [];
          }
        });
      // function(resp) {
      //   this.tableData[0] = resp.data.data;
      //   console.log(" _this.tableData:", _this.tableData);
      // })
      // .catch((err) => {
      //   console.log(err);
      // }
      // );
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios
            .post("/user/updateInfo", this.ruleForm, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log(res);
              _this.$alert("修改成功", "提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  _this.$router.push("/account_information/updateUserInfoPage");
                },
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
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
