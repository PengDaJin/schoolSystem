<template>
  <div class="mod-config">
    <template v-if="operateType === 0">
      <head-content-box title="查询条件">
        <el-row :gutter="30" style="margin-bottom: -20px">
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
                <!-- <el-button v-if="isAuth('sys:roomap:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
                <el-button v-if="isAuth('sys:roomap:delete')" type="danger" @click="deleteHandle()"
                  :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </head-content-box>
      <head-content>
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
          :cell-style="TableRowStyle"
          style="width: 100%;"
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
            prop="actName"
            header-align="center"
            align="center"
            label="活动名称"
          >
          </el-table-column>
          <el-table-column
            prop="lessonNum"
            header-align="center"
            align="center"
            label="课程编号"
          >
          </el-table-column>
          <el-table-column
            prop="weekNumId"
            header-align="center"
            align="center"
            label="周时间id"
          >
          </el-table-column>
          <el-table-column
            prop="useTimeId"
            header-align="center"
            align="center"
            label="使用时间id"
          >
          </el-table-column>
          <el-table-column
            prop="period"
            header-align="center"
            align="center"
            label="周时段"
          >
          </el-table-column>
          <el-table-column
            prop="orderNum"
            header-align="center"
            align="center"
            label="使用人证件号"
          >
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            header-align="center"
            align="center"
            :formatter="orderStatus"
            label="预约教室状态"
          >
          </el-table-column>
          <el-table-column
            prop="useStatus"
            header-align="center"
            align="center"
            :formatter="useStatus"
            label="使用状态"
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
            prop="createTime"
            header-align="center"
            align="center"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
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
import AddOrUpdate from "./roomap-add-or-update";
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
      dataListLoading: false,
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
    orderStatus(row) {
      if (row.orderStatus == 0) {
        return "正在预约";
      } else if (row.orderStatus == 1) {
        return "预约成功";
      }else if (row.orderStatus == 2) {
        return "预约失败";
      } else {
        return "-";
      }
    },
    useStatus(row) {
      if (row.useStatus == 0) {
        return "未使用";
      } else if (row.useStatus == 1) {
        return "使用中";
      } else {
        return "-";
      }
    },
    // 获取数据列表
    getDataList() {
      this.$axios
        .get("/roomap/list", {
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
          this.dataListLoading = false;
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
          url: this.$http.adornUrl("/roomap/delete"),
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
