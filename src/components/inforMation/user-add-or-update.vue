<template>
  <div>
    <head-content-box style="height: 60px;">
      <el-page-header
        @back="goBack"
        :content="!dataForm.id ? '新增' : '修改'"
      />
    </head-content-box>
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
    >
      <head-content-box style="height: 100%;" title="用户信息" color="#ff9149">
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
            <el-form-item label="性别" prop="sex">
              <el-select
                v-model="dataForm.sex"
                style="width:100%"
                :formatter="sex"
                placeholder="请选择性别"
              >
                <el-option
                  v-for="item in optionssex"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </head-content-box>
    </el-form>
    <head-content-box style="height: 80px;" :isTip="false">
      <div class="flex-row-end">
        <el-button @click="goBack()">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </div>
    </head-content-box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionssex: [
        {
          value: "0",
          label: "男",
        },
        {
          value: "1",
          label: "女",
        },
      ],
      dataForm: {
        id: 0,
        username: "",
        password: "",
        realname: "",
        schoolCard: "",
        age: "",
        sex: "",
        deleted: "",
      },
      dataRule: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" },
        ],
        schoolCard: [
          { required: true, message: "学校证件号码不能为空", trigger: "blur" },
        ],
        age: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
        sex: [
          { required: true, message: "性别 0男 1女不能为空", trigger: "blur" },
        ],
      },
    };
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
            .post(
              `/user/${!this.dataForm.id ? "register" : "update"}`,
              this.dataForm
            )
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
