<template>
  <div class="mod-config">
    <template v-if="operateType === 0">
      <el-row :gutter="20">
        <head-content-box
          style="margin: 0 10px 25px 10px;"
          title="查询条件"
          color="#4B8AFE"
        >
          <el-form
            :inline="true"
            :model="dataForm"
            @keyup.enter.native="getDataList()"
          >
            <el-col :inline="true" :span="3.5">
              <el-form-item label="真实姓名:">
                <el-input
                  v-model="dataForm.realname"
                  placeholder="真实姓名"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :inline="true" :span="3.5">
              <el-form-item label="学校证件号码:">
                <el-input
                  v-model="dataForm.schoolCard"
                  placeholder="学校证件号码"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :inline="true" :span="3.5">
              <el-form-item label="性别">
                <el-select
                  v-model="dataForm.sex"
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
            <el-col :inline="true" :span="1.5">
              <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                <el-button type="warning" @click="clearForm()">清空</el-button>
              </el-form-item>
            </el-col>
            <el-col :inline="true" :span="1.5">
              <el-button type="primary" @click="addOrUpdateHandle()"
                >新增</el-button
              >
            </el-col>
          </el-form>
        </head-content-box>
      </el-row>
      <head-content>
        <el-table
          :data="dataList"
          border
          size="medium"
        >
          <el-table-column
            prop="username"
            header-align="center"
            align="center"
            label="用户名"
          >
          </el-table-column>
          <el-table-column
            prop="realname"
            header-align="center"
            align="center"
            label="真实姓名"
          >
          </el-table-column>
          <el-table-column
            prop="schoolCard"
            header-align="center"
            align="center"
            label="学校证件号码"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="age"
            header-align="center"
            align="center"
            label="年龄"
          >
          </el-table-column>
          <el-table-column
            prop="sex"
            header-align="center"
            align="center"
            :formatter="sex"
            label="性别"
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
            label="修改时间"
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
import AddOrUpdate from "./user-add-or-update";
export default {
  name: "AddOr-update",
  data() {
    return {
      dataForm: {
        realname: "",
        schoolCard: "",
        sex: "",
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      addOrUpdateVisible: false,
      operateType: 0, // 1新增 2修改 3详情
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
    };
  },
  components: {
    AddOrUpdate,
  },
  activated() {
    this.getDataList();
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
    role(row) {
      if (row.role == 1) {
        return "老师";
      } else if (row.role == 2) {
        return "同学";
      } else {
        return "-";
      }
    },
    // 获取数据列表
    getDataList() {
      this.$axios
        .get("/user/list", {
          params: {
            currPage: this.pageIndex,
            pageSize: this.pageSize,
            realname: this.dataForm.realname,
            schoolCard: this.dataForm.schoolCard,
            sex: this.dataForm.sex,
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
        this.$axios
          .delete("/user/delete", {
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
  },
};
</script>
<style lang="less" scoped>
.analysis-results {
  width: 100%;
  height: 100%;
}
</style>
