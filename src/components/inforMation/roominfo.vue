<template>
  <div class="analysis-results">
    <template v-if="operateType === 0">
      <!-- <el-row :gutter="30">
        <head-content-box
          style="margin: 0 15px 25px 15px;"
          title="查询条件"
          color="#4B8AFE"
        >
          <el-form
            :inline="true"
            :model="dataForm"
            @keyup.enter.native="getDataList()"
          >
            <el-col :inline="true" :span="3.5">
              <el-form-item label="参数名:">
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
              </el-form-item>
            </el-col>
          </el-form>
        </head-content-box>
      </el-row> -->
      <head-content>
        <el-table
          :data="dataList"
          border
          @selection-change="selectionChangeHandle"
          :cell-style="TableRowStyle"
          size="medium"
        >
          <!-- <el-table-column
            prop="id"
            header-align="center"
            align="center"
            label="主键id"
          >
          </el-table-column> -->
          <el-table-column
            prop="roomNum"
            header-align="center"
            align="center"
            label="教室编号"
          >
          </el-table-column>
          <el-table-column
            prop="roomType"
            header-align="center"
            align="center"
            :formatter="roomtype"
            label="教室类型"
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
            prop="realiaInfo"
            header-align="center"
            align="center"
            label="教具信息描述"
          >
          </el-table-column>
          <!-- 0允许预约 1无法预约 -->
          <el-table-column
            prop="status"
            header-align="center"
            align="center"
            :formatter="status"
            label="教室可预约状态"
          >
          </el-table-column>
          <!-- <el-table-column
          prop="deleted"
          header-align="center"
          align="center"
          label="逻辑删除"
        >
        </el-table-column>
        <el-table-column
          prop="createtime"
          header-align="center"
          align="center"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          prop="updatetime"
          header-align="center"
          align="center"
          label="更新时间"
        >
        </el-table-column> -->
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="150"
            label="操作"
            v-if="role < 3"
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
              <el-button type="text" size="small" @click="addOrUpdateHandle()"
                >新增</el-button
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
      </head-content>
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
import AddOrUpdate from "./roominfo-add-or-update";
export default {
  data() {
    return {
      role: 0,
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
    this.role = this.$store.getters.getUser.role;
    this.getDataList();
  },
  methods: {
    roomtype(row) {
      if (row.roomType == 0) {
        return "普通教室";
      } else if (row.roomType == 1) {
        return "标准教室A/B";
      } else if (row.roomType == 2) {
        return "实验室A/B";
      } else if (row.roomType == 3) {
        return "阶梯教室A/B";
      } else {
        return "错误!请联系管理员";
      }
    },
    status(row) {
      if (row.status == 0) {
        return "允许预约";
      } else if (row.status == 1) {
        return "无法预约";
      } else {
        return "-";
      }
    },
    // 获取数据列表
    getDataList() {
      this.$axios
        .get("/roominfo/list", {
          // this.$http({
          //   url: this.$http.adornUrl("/roominfo/list"),
          // method: "get",
          params: this.$http.adornParams({
            currPage: this.pageIndex,
            pageSize: this.pageSize,
            key: this.dataForm.key,
          }),
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
        // this.$http({
        //   url: this.$http.adornUrl("/roominfo/delete"),
        //   method: "post",
        //   data: this.$http.adornData(ids, false),

        this.$axios
          .delete("/roominfo/delete", {
            params: {
              id: id,
            },
          })
          .then(({ data }) => {
            if (data && data.code === 200) {
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
<style lang="less" scoped>
.analysis-results {
  width: 100%;
  height: 100%;
}
</style>
