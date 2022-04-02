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
            <el-form-item label="班级号" prop="classId">
              <el-input
                v-model="dataForm.classId"
                placeholder="班级号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="教师id" prop="teacherId">
              <el-input
                v-model="dataForm.teacherId"
                placeholder="教师id"
              ></el-input>
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
      dataForm: {
        id: 0,
        classId: "",
        teacherId: "",
        deleted: "",
        createTime: "",
        updateTime: "",
      },
      dataRule: {
        classId: [
          { required: true, message: "班级号不能为空", trigger: "blur" },
        ],
        teacherId: [
          { required: true, message: "教师id不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 返回首頁
    goBack() {
      this.$emit("goBack");
    },
    // this.$http({
    //   url: this.$http.adornUrl(`/classinfo/info/${this.dataForm.id}`),
    //   method: "get",
    //   params: this.$http.adornParams(),
    // }).then(({ data }) => {
    init(id) {
      this.dataForm.id = id || 0;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$axios
            .get(`/class/info/`, {
              params: {
                id: this.dataForm.id,
              },
            })
            .then(({ data }) => {
              if (data && data.code === 200) {
                this.dataForm.classId = data.data.classId;
                this.dataForm.teacherId = data.data.teacherId;
              }
            });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$axios
            .post(
              `/class/${!this.dataForm.id ? "add" : "update"}`,
              // this.dataForm
              {
                id: this.dataForm.id || undefined,
                classId: this.dataForm.classId,
                teacherId: this.dataForm.teacherId,
                // deleted: this.dataForm.deleted,
                // createTime: this.dataForm.createTime,
                // updateTime: this.dataForm.updateTime,
              }
            )
            .then(({ data }) => {
              if (data && data.code === 200) {
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
