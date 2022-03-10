<!-- login -->
<template>
  <div>
    <el-row :gutter="0">
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        <div class="grid-content bg-purple-light hidden-xs-only"></div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content bg-purple hidden-md-and-down">
          <img style="width: 100%" src="@/assets/img/img-3.svg" alt="" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="14" :md="14" :lg="6" :xl="6">
        <div class="grid-content bg-purple">

          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm"
            style="margin: auto">
            <!-- <img src="../assets/img/avatar.svg" alt="" style="width: 20%"> -->

            <el-form-item label="用户名" prop="username" style="margin-left: -100px;">
              <el-input style="width: 120%" type="text" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" style="margin-left: -100px;">
              <el-input style="width: 120%" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item style="margin-left: -100px;">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

            <el-button type="text" @click="dialog = true">也许你需要点这里注册一下！</el-button>

          </el-form>

        </div>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        <div class="grid-content bg-purple-light hidden-xs-only"></div>
      </el-col>

    </el-row>

    <el-drawer :visible.sync="dialog" direction="rtl" custom-class="demo-drawer" ref="drawer">

      <div class="demo-drawer__content" style="margin-left: -4px;">
        <img src="../assets/img/avatar.svg" alt="" style="width: 20%; padding-bottom: 20px">
        <el-form :model="rform" status-icon :rules="rules" ref="rform" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="rform.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="rform.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass">
            <el-input type="password" v-model="rform.checkpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学生证号" prop="studentId">
            <el-input type="text" v-model="rform.studentId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phoneNum">
            <el-input type="text" v-model="rform.phoneNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="在线联系" prop="onlineContact">
            <el-input type="text" v-model="rform.onlineContact" autocomplete="on"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitrform()" :loading="loading">
              {{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('rform')">重 置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancelForm">取 消</el-button>
          </el-form-item>

        </el-form>

      </div>
    </el-drawer>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";

export default {
  name: "Login",
  data () {

    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    //注册表单部分
    var validateUser2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.rform.checkpass !== '') {
          this.$refs.rform.validateField('checkpass');
        }
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.rform.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateStuId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入学生证号'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系电话'));
      } else {
        callback();
      }
    };
    var validateOnline = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入在线联系方式'));
      } else {
        callback();
      }
    };



    return {
      ruleForm: {
        username: "admin",
        password: "admin",
      },


      //注册表单部分
      dialog: false,
      loading: false,
      formLabelWidth: '80px',
      timer: null,

      rform: {
        username: '123',
        password: '',
        checkpass: '',
        studentId: '',
        phoneNum: '12300000000',
        onlineContact: '45678954@qq.com',
        // delivery: false,
      },

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在3到18个字符", trigger: "blur" },
          { validator: validateUser, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 18, message: "长度在1到18个字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],


        // 注册表单部分
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在3到18个字符", trigger: "blur" },
          { validator: validateUser2, trigger: "blur" },
        ],
        checkpass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18个字符", trigger: "blur" },
          { validator: validatePass3, trigger: "blur" },
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
        ],

      },

    };
  },

  methods: {
    // 登录表单
    submitForm (formName) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {



          const _this = this;
          this.$axios.post("/login", this.ruleForm).then((res) => {

            // console.log(res)
            // console.log(res.data.data)

            const jwt = res.headers["authorization"];
            const userInfo = res.data.data;

            // console.log(userInfo)

            // 把数据共享出去
            _this.$store.commit("SET_TOKEN", jwt);
            _this.$store.commit("SET_USERINFO", userInfo);

            // 获取USerInfo信息
            // console.log("================")
            // console.log(_this.$store.getters.getUser)

            _this.$router.push("/home");
          });


        } else {
          console.log("error submit!!");
          this.$message("请确认您输入的都正确了嘛！？");
          return false;
        }
      });

    },


    //重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },


    //以下为注册表单操作 
    submitrform (formName) {
      this.$refs['rform'].validate((valid) => {
        if (valid) {


          if (this.loading) {

            return;
          }
          this.$confirm('确定注册吗？').then(_ => {
            this.loading = false;

            // done();
            // 动画关闭需要一定的时间
            this.$axios.post("/user/register", this.rform).then((res) => {
              console.log(res.data);

              this.$message.success('注册成功！u success Register！')
              this.loading = false;
            });

          })
            .catch(_ => { });


        } else {
          console.log("error submit!!");
          this.$message("请确认您输入的都正确了嘛！？");
          return false;
        }
      });

    },




    //取消关闭Drawer
    cancelForm () {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },

  },





  mounted () {
    this.$notify.info({
      title: "反悔提示",
      dangerouslyUseHTMLString: true,
      message:
        '嘿！点这-><a style="text-decoration:none;color:blue"href="/Home">首页</a> 先回首页看看',
      position: "top-right",
      duration: 3000,
    });
    this.$notify({
      title: "注册提示",
      message: "如果你需要一个新账号！点注册试试！",
      showClose: false,
      position: "top-right",
      type: "warning",
      offset: 70,
      duration: 2000,
    });
  },
};
</script>
<style >
body {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/img/bg.png");
  background-size: 100% 100%;
  /* background-color: #000; */
}
.el-row {
  padding-top: 100px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: rgba(255, 255, 255, 0);
}
.bg-purple-light {
  background: 56, 211, 159, 0;
}
.grid-content {
  display: flex;
  border-radius: 4px;
  min-height: 470px;
}
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: "";
}
/* .el-form-item {
  margin-bottom: 15px;
}
.el-form-item__label {
  width: 80px;
} */
</style>