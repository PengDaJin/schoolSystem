<template>
  <div class="mod-config">
    <template v-if="operateType === 0">
      <el-row :gutter="30" style="margin-bottom: -20px">
        <el-form
          :inline="true"
          :model="dataForm"
          @keyup.enter.native="getDataList()"
        >
          <el-col :inline="true" :span="3.5">
            <el-form-item>
              <el-input
                v-model="dataForm.key"
                placeholder="参数名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="1.5">
            <el-form-item>
              <el-col :inline="true" :span="1.5">
                <el-form-item>
                  <el-button @click="getDataList()">查询</el-button>
                  <el-button type="warning" @click="clearForm()"
                    >清空</el-button
                  >
                </el-form-item>
              </el-col>
              <el-button type="primary" @click="addOrUpdateHandle()"
                >新增</el-button
              >
              <el-button
                type="danger"
                @click="deleteHandle()"
                :disabled="dataListSelections.length <= 0"
                >批量删除
              </el-button>
              <!-- <el-button v-if="isAuth('sys:lessoninfo:save')" type="primary" @click="addOrUpdateHandle()">新增
                </el-button>
                <el-button v-if="isAuth('sys:lessoninfo:delete')" type="danger" @click="deleteHandle()"
                  :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-table
        :data="dataList"
        border
        @selection-change="selectionChangeHandle"
        :cell-style="TableRowStyle"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          header-align="center"
          align="center"
          label="主键id"
        >
        </el-table-column>
        <el-table-column
          prop="lessonnum"
          header-align="center"
          align="center"
          label="课程编号"
        >
        </el-table-column>
        <el-table-column
          prop="lessonname"
          header-align="center"
          align="center"
          label="课程名称"
        >
        </el-table-column>
        <el-table-column
          prop="teacherid"
          header-align="center"
          align="center"
          label="教师编号"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          header-align="center"
          align="center"
          label="描述"
        >
        </el-table-column>
        <el-table-column
          prop="classid"
          header-align="center"
          align="center"
          label="班级id"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row.id)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="deleteHandle(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </template>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-show="operateType === 1"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
      @goBack="goBack"
    >
    </add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from "./lessoninfo-add-or-update";
export default {
  data() {
    return {
      dataForm: {
        key: "",
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      addOrUpdateVisible: false,
      operateType: 0, // 1新增 2修改 3详情
    };
  },
  components: {
    AddOrUpdate,
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.$axios
        .get("http://175.178.215.234:8801/lessoninfo/list", {
          // this.$http({
          //   url: this.$http.adornUrl("/lessoninfo/list"),
          //   method: "get",
          // params: this.$http.adornParams({
          //   currPage: this.pageIndex,
          //   pageSize: this.pageSize,
          //   key: this.dataForm.key,
          // }),
          params: {
            currPage: this.pageIndex,
            pageSize: this.pageSize,
            key: this.dataForm.key,
          },
        })
        .then(({ data }) => {
          if (data && data.code === 200) {
            this.dataList = data.data.records;
            this.totalPage = data.data.total;
          } else {
            this.dataList = [];
            this.totalPage = 0;
          }
        });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.operateType = 1;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    goBack() {
      this.operateType = 0;
      this.getDataList();
    },
    // 清空
    clearForm() {
      Object.keys(this.dataForm).forEach((key) => {
        this.dataForm[key] = "";
      });
    },
    // 改变表格背景色
    TableRowStyle({ row }) {
      if (row) {
        return "background-color: #FFFFFF";
      }
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map((item) => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/lessoninfo/delete"),
          method: "post",
          data: this.$http.adornData(ids, false),
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              },
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
  },
};
</script>
