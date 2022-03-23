<template>
  <div>
    <el-page-header
      @back="goBack()"
      :content="!dataForm.id ? '修改' : '新增'"
    ></el-page-header>

    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
    >
      <el-row :gutter="40">
        <el-col :inline="true" :span="8">
          <el-form-item label="课程编号" prop="lessonnum">
            <el-input
              v-model="dataForm.lessonnum"
              placeholder="课程编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="课程名称" prop="lessonname">
            <el-input
              v-model="dataForm.lessonname"
              placeholder="课程名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="教师编号" prop="teacherid">
            <el-input
              v-model="dataForm.teacherid"
              placeholder="教师编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="描述" prop="description">
            <el-input
              v-model="dataForm.description"
              placeholder="描述"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="班级id" prop="classid">
            <el-input
              v-model="dataForm.classid"
              placeholder="班级id"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
      <div class="flex-row-end">
        <el-button @click="goBack()">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        lessonnum: "",
        lessonname: "",
        teacherid: "",
        description: "",
        classid: "",
      },
      dataRule: {
        lessonnum: [
          { required: true, message: "课程编号不能为空", trigger: "blur" },
        ],
        lessonname: [
          { required: true, message: "课程名称不能为空", trigger: "blur" },
        ],
        teacherid: [
          { required: true, message: "教师编号不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "描述不能为空", trigger: "blur" },
        ],
        classid: [
          { required: true, message: "班级id不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 返回首頁
    goBack() {
      this.$emit("goBack");
    },
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/lessoninfo/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams(),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.lessonnum = data.data.lessonnum;
              this.dataForm.lessonname = data.data.lessonname;
              this.dataForm.teacherid = data.data.teacherid;
              this.dataForm.description = data.data.description;
              this.dataForm.classid = data.data.classid;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/lessoninfo/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              lessonnum: this.dataForm.lessonnum,
              lessonname: this.dataForm.lessonname,
              teacherid: this.dataForm.teacherid,
              description: this.dataForm.description,
              classid: this.dataForm.classid,
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  // this.visible = false
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
