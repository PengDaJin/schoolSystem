<template>
  <div>
    <rj-content-box style="height: 60px;">
      <el-page-header
        @back="goBack"
        :content="!dataForm.id ? '新增' : '修改'"
      />
    </rj-content-box>
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
    >
      <rj-content-box style="height: 100%;" title="用户信息" color="#ff9149">
        <el-row :gutter="40">
          <el-col :inline="true" :span="8">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="dataForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="dataForm.password"
                placeholder="密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="真实姓名" prop="realname">
              <el-input
                v-model="dataForm.realname"
                placeholder="真实姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="学校证件号码" prop="schoolCard">
              <el-input
                v-model="dataForm.schoolCard"
                placeholder="学校证件号码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="dataForm.age" placeholder="年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="性别 0男 1女" prop="sex">
              <el-input
                v-model="dataForm.sex"
                placeholder="性别 0男 1女"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="-1管理员 1老师 2学生" prop="role">
              <el-input
                v-model="dataForm.role"
                placeholder="-1管理员 1老师 2学生"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="逻辑删除 0正常 1注销 2封禁" prop="deleted">
              <el-input
                v-model="dataForm.deleted"
                placeholder="逻辑删除 0正常 1注销 2封禁"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="创建时间" prop="createTime">
              <el-input
                v-model="dataForm.createTime"
                placeholder="创建时间"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="修改时间" prop="updateTime">
              <el-input
                v-model="dataForm.updateTime"
                placeholder="修改时间"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </rj-content-box>
    </el-form>
    <rj-content-box style="height: 80px;" :isTip="false">
      <div class="flex-row-end">
        <el-button @click="goBack()">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </div>
    </rj-content-box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataForm: {
        id: 0,
        username: "",
        password: "",
        realname: "",
        schoolCard: "",
        age: "",
        sex: "",
        role: "",
        deleted: "",
        createTime: "",
        updateTime: "",
      },
      // dataRule: {
      //   username: [
      //     { required: true, message: "用户名不能为空", trigger: "blur" },
      //   ],
      //   password: [
      //     { required: true, message: "密码不能为空", trigger: "blur" },
      //   ],
      //   realname: [
      //     { required: true, message: "真实姓名不能为空", trigger: "blur" },
      //   ],
      //   schoolCard: [
      //     { required: true, message: "学校证件号码不能为空", trigger: "blur" },
      //   ],
      //   age: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
      //   sex: [
      //     { required: true, message: "性别 0男 1女不能为空", trigger: "blur" },
      //   ],
      //   role: [
      //     {
      //       required: true,
      //       message: "-1管理员 1老师 2学生不能为空",
      //       trigger: "blur",
      //     },
      //   ],
      //   deleted: [
      //     {
      //       required: true,
      //       message: "逻辑删除 0正常 1注销 2封禁不能为空",
      //       trigger: "blur",
      //     },
      //   ],
      //   createTime: [
      //     { required: true, message: "创建时间不能为空", trigger: "blur" },
      //   ],
      //   updateTime: [
      //     { required: true, message: "修改时间不能为空", trigger: "blur" },
      //   ],
      // },
    };
  },
  methods: {
    // 返回首頁
    goBack() {
      this.$emit("goBack");
    },
    init(id) {
      this.dataForm.id = id || 0;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$axios
            .get(`/user/getUserById/${this.dataForm.id}`)
            .then(({ data }) => {
              if (data && data.code === 200) {
                this.dataForm.username = data.data.username;
                this.dataForm.password = data.data.password;
                this.dataForm.realname = data.data.realname;
                this.dataForm.schoolCard = data.data.schoolCard;
                this.dataForm.age = data.data.age;
                this.dataForm.sex = data.data.sex;
                this.dataForm.role = data.data.role;
                this.dataForm.deleted = data.data.deleted;
                this.dataForm.createTime = data.data.createTime;
                this.dataForm.updateTime = data.data.updateTime;
              }
            });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          console.log("valid:", valid);
          this.$axios
            .post(`http://175.178.215.234:8801/user/${!this.dataForm.id ? "register" : "update"}`,this.dataForm)
              // {
                // data: {
                //   username: this.dataForm.username,
                //   password: this.dataForm.password,
                //   realname: this.dataForm.realname,
                //   schoolCard: this.dataForm.schoolCard,
                //   age: this.dataForm.age,
                //   sex: this.dataForm.sex,
                  // id: this.dataForm.id || undefined,
                  // role: this.dataForm.role,
                  // deleted: this.dataForm.deleted,
                  // createTime: this.dataForm.createTime,
                  // updateTime: this.dataForm.updateTime,
                // },
              // }
            .then(({ data }) => {
              if (data && data.code === 200) {
                this.goBack();
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.$emit("goBack");
                    this.$emit("refreshDataList");
                  },
                });
              } else {
                this.$message.error(data.msg);
              }
            });
        }
      });
    },
  },
};
</script>
