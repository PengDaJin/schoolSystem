<template>
  <div>
    <head-content-box style="height: 60px;">
      <el-page-header
        @back="goBack()"
        :content="!dataForm.id ? '新增' : '修改'"
      ></el-page-header>
    </head-content-box>
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
    >
      <head-content-box
        style="height: 170px;"
        title="学校课程信息"
        color="#ff9149"
      >
        <el-row :gutter="40">
          <el-col :inline="true" :span="8">
            <el-form-item label="时段名称" prop="usePeriod">
              <el-input
                v-model="dataForm.usePeriod"
                placeholder="时段名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <!-- :picker-options="{
                arrow-control
                  selectableRange: '18:30:00 - 20:30:00',
                }" -->
            <el-form-item label="使用时间-结束时间" prop="Time">
              <el-time-picker
                is-range
                v-model="dataForm.Time"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              >
              </el-time-picker>
              <!-- <el-form-item label="使用时间" prop="startTime">
              <el-time-picker
                v-model="dataForm.startTime"
                style="width:100%"
                placeholder="任意时间点"
              >
              </el-time-picker> -->
              <!-- <el-input
                v-model="dataForm.startTime"
                placeholder="使用时间"
              ></el-input> -->
            </el-form-item>
          </el-col>
          <!-- <el-col :inline="true" :span="8">
            <el-form-item label="结束时间" prop="endTime">
              <el-time-picker
                v-model="dataForm.endTime"
                style="width:100%"
                placeholder="任意时间点"
              >
              </el-time-picker>
              <el-input
                v-model="dataForm.endTime"
                placeholder="结束时间"
              ></el-input>
            </el-form-item>
          </el-col> -->
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
        usePeriod: "",
        startTime: "",
        endTime: "",
        Time: [new Date(2022, 9, 10, 8, 40), new Date(2022, 9, 10, 9, 40)],
      },
      dataRule: {
        usePeriod: [
          { required: true, message: "时段名称不能为空", trigger: "blur" },
        ],
        // startTime: [
        //   { required: true, message: "使用时间不能为空", trigger: "blur" },
        // ],
        // endTime: [
        //   { required: true, message: "结束时间不能为空", trigger: "blur" },
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
        //     url: this.$http.adornUrl(`/timeinfo/info/${this.dataForm.id}`),
        //     method: 'get',
        //     params: this.$http.adornParams()
        //   })
        if (this.dataForm.id) {
          this.$axios
            .get(`/timeinfo/info/${this.dataForm.id}`)
            .then(({ data }) => {
              if (data && data.code === 200) {
                this.dataForm.usePeriod = data.data.usePeriod;
                // this.dataForm.startTime = data.data.startTime;
                // this.dataForm.endTime = data.data.endTime;
              }
            });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      // let Time = this.dataForm.startTime;
      // console.log(
      //   "this.dataForm.startTime.toLocaleDateString():",
      //   Time[0].toLocaleTimeString()
      //   // d.toLocaleTimeString()
      // );
      // console.log(this.dataForm.startTime);
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$axios
            .post(
              `/timeinfo/${!this.dataForm.id ? "save" : "update"}`,
              // this.dataForm
              {
                id: this.dataForm.id || undefined,
                usePeriod: this.dataForm.usePeriod,
                // startTime: this.dataForm.startTime,
                // endTime: this.dataForm.endTime,
                startTime: this.dataForm.Time[0].toLocaleTimeString(),
                endTime: this.dataForm.Time[1].toLocaleTimeString(),
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
