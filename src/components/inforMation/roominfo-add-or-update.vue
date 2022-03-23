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
          <el-form-item label="教室编号" prop="roomnum">
            <el-input
              v-model="dataForm.roomnum"
              placeholder="教室编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="教室类型" prop="roomtype">
            <el-input
              v-model="dataForm.roomtype"
              placeholder="教室类型"
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
          <el-form-item label="教具信息描述" prop="realiainfo">
            <el-input
              v-model="dataForm.realiainfo"
              placeholder="教具信息描述"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item
            label="教室可预约状态 0允许预约 1无法预约"
            prop="status"
          >
            <el-input
              v-model="dataForm.status"
              placeholder="教室可预约状态 0允许预约 1无法预约"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="逻辑删除" prop="deleted">
            <el-input
              v-model="dataForm.deleted"
              placeholder="逻辑删除"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="创建时间" prop="createtime">
            <el-input
              v-model="dataForm.createtime"
              placeholder="创建时间"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="更新时间" prop="updatetime">
            <el-input
              v-model="dataForm.updatetime"
              placeholder="更新时间"
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
        roomnum: "",
        roomtype: "",
        description: "",
        realiainfo: "",
        status: "",
        deleted: "",
        createtime: "",
        updatetime: "",
      },
      dataRule: {
        roomnum: [
          { required: true, message: "教室编号不能为空", trigger: "blur" },
        ],
        roomtype: [
          { required: true, message: "教室类型不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "描述不能为空", trigger: "blur" },
        ],
        realiainfo: [
          { required: true, message: "教具信息描述不能为空", trigger: "blur" },
        ],
        status: [
          {
            required: true,
            message: "教室可预约状态 0允许预约 1无法预约不能为空",
            trigger: "blur",
          },
        ],
        deleted: [
          { required: true, message: "逻辑删除不能为空", trigger: "blur" },
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" },
        ],
        updatetime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" },
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
            url: this.$http.adornUrl(`/roominfo/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams(),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.roomnum = data.data.roomnum;
              this.dataForm.roomtype = data.data.roomtype;
              this.dataForm.description = data.data.description;
              this.dataForm.realiainfo = data.data.realiainfo;
              this.dataForm.status = data.data.status;
              this.dataForm.deleted = data.data.deleted;
              this.dataForm.createtime = data.data.createtime;
              this.dataForm.updatetime = data.data.updatetime;
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
              `/roominfo/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              roomnum: this.dataForm.roomnum,
              roomtype: this.dataForm.roomtype,
              description: this.dataForm.description,
              realiainfo: this.dataForm.realiainfo,
              status: this.dataForm.status,
              deleted: this.dataForm.deleted,
              createtime: this.dataForm.createtime,
              updatetime: this.dataForm.updatetime,
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
