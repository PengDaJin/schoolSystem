<!-- 修改密码 -->
<template>
  <div>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="padding: 50px">
      <el-form-item label="原密码" prop="oldpassowrd">
        <el-input v-model="form.oldpassowrd" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input v-model="form.newpassword" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkpassword">
        <el-input v-model="form.checkpassword" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认更改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "UpdateUserPwdPage",

  data () {

    var validateOld = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        callback();
      }
    };
    var validateNew = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value == this.form.oldpassowrd) {
        callback(new Error('请使用与旧密码不一致的密码!'));
      } else {
        callback();
      }
    };
    var validateCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };


    return {
      form: {
        oldpassowrd: '',
        newpassword: '',
        checkpassword: '',
      },
      rules: {
        oldpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18个字符", trigger: "blur" },
          { validator: validateOld, trigger: "blur" },
        ],
        newpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18个字符", trigger: "blur" },
          { validator: validateNew, trigger: "blur" },
        ],
        checkpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18个字符", trigger: "blur" },
          { validator: validateCheck, trigger: "blur" },
        ]
      },

    }
  },



  methods: {
    onSubmit () {
      console.log('submit!');

      this.$refs['form'].validate((valid) => {
        if (valid) {

          this.$confirm('即将修改密码').then(_ => {
            this.$axios.post('/user/updatePassword/' + this.$store.getters.getUser.id + '/' + this.$md5(this.form.oldpassowrd) + '/' + this.$md5(this.form.newpassword)).then((res) => {
              this.$message.success('密码修改成功!')
            });
          })
            .catch(_ => { });

        } else {
          this.$message('请再次确认你的输入框是否填写正确！');
          return false;
        }

      });
    },
  }
}
</script>
<style scoped>
</style>