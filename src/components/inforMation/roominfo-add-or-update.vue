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
      <rj-content-box style="height: 100%;" title="教室信息" color="#ff9149">
        <el-row :gutter="40">
          <el-col :inline="true" :span="8">
            <el-form-item label="教室编号" prop="roomNum">
              <el-input
                v-model="dataForm.roomNum"
                placeholder="教室编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="教室类型" prop="roomType">
              <el-input
                v-model="dataForm.roomType"
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
            <el-form-item label="教具信息描述" prop="realiaInfo">
              <el-input
                v-model="dataForm.realiaInfo"
                placeholder="教具信息描述"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="教室可预约状态" prop="status">
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
        roomNum: "",
        roomType: "",
        description: "",
        realiaInfo: "",
        status: "",
        deleted: "",
        createtime: "",
        updatetime: "",
      },
      dataRule: {
        roomNum: [
          { required: true, message: "教室编号不能为空", trigger: "blur" },
        ],
        roomType: [
          { required: true, message: "教室类型不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "描述不能为空", trigger: "blur" },
        ],
        realiaInfo: [
          { required: true, message: "教具信息描述不能为空", trigger: "blur" },
        ],
        status: [
          {
            required: true,
            message: "教室可预约状态 0允许预约 1无法预约不能为空",
            trigger: "blur",
          },
        ],
        // deleted: [
        //   { required: true, message: "逻辑删除不能为空", trigger: "blur" },
        // ],
        // createtime: [
        //   { required: true, message: "创建时间不能为空", trigger: "blur" },
        // ],
        // updatetime: [
        //   { required: true, message: "更新时间不能为空", trigger: "blur" },
        // ],
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
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        // if (this.dataForm.id) {
        //   this.$http({
        //     url: this.$http.adornUrl(`/roominfo/info/${this.dataForm.id}`),
        //     method: "get",
        //     params: this.$http.adornParams(),
        if (this.dataForm.id) {
          this.$axios.get(`/user/info/${this.dataForm.id}`).then(({ data }) => {
            if (data && data.code === 200) {
              this.dataForm.roomNum = data.data.roomNum;
              this.dataForm.roomType = data.data.roomType;
              this.dataForm.description = data.data.description;
              this.dataForm.realiaInfo = data.data.realiaInfo;
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
          // this.$axios
          // .post(`/roominfo/${!this.dataForm.id ? "add" : "update"}`,
          // {
          //   data: {
          //     // id: this.dataForm.id || undefined,
          //     roomNum: this.dataForm.roomNum,
          //     roomType: this.dataForm.roomType,
          //     description: this.dataForm.description,
          //     realiaInfo: this.dataForm.realiaInfo,
          //     status: this.dataForm.status,
          //     // deleted: this.dataForm.deleted,
          //     // createtime: this.dataForm.createtime,
          //     // updatetime: this.dataForm.updatetime,
          //   },
          // })
          this.$axios
            .post(
              `/roominfo/${!this.dataForm.id ? "add" : "update"}`,
              this.dataForm
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
