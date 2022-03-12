<template>
  <div>
    <rj-content-box>
      <el-page-header @back="goBack()" :content="!dataForm.id ? '修改' : '新增'"></el-page-header>
    </rj-content-box>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()">
      <rj-content-box title="" color="#ff9149">
        <el-row :gutter="40">
          <el-col :inline="true" :span="8">
            <el-form-item label="教室编号" prop="roomnum">
              <el-input v-model="dataForm.roomnum" placeholder="教室编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="活动名称" prop="actname">
              <el-input v-model="dataForm.actname" placeholder="活动名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="课程编号" prop="lessonnum">
              <el-input v-model="dataForm.lessonnum" placeholder="课程编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="周时间id" prop="weeknumid">
              <el-input v-model="dataForm.weeknumid" placeholder="周时间id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="使用时间id" prop="usetimeid">
              <el-input v-model="dataForm.usetimeid" placeholder="使用时间id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="周时段" prop="period">
              <el-input v-model="dataForm.period" placeholder="周时段"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="使用人证件号" prop="ordernum">
              <el-input v-model="dataForm.ordernum" placeholder="使用人证件号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="预约教室状态 0正在预约 1预约成功 2预约失败" prop="orderstatus">
              <el-input v-model="dataForm.orderstatus" placeholder="预约教室状态 0正在预约 1预约成功 2预约失败"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="使用状态 0未使用 1使用中" prop="usestatus">
              <el-input v-model="dataForm.usestatus" placeholder="使用状态 0未使用 1使用中"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="逻辑删除" prop="deleted">
              <el-input v-model="dataForm.deleted" placeholder="逻辑删除"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="创建时间" prop="createtime">
              <el-input v-model="dataForm.createtime" placeholder="创建时间"></el-input>
            </el-form-item>
          </el-col>
          <el-col :inline="true" :span="8">
            <el-form-item label="更新时间" prop="updatetime">
              <el-input v-model="dataForm.updatetime" placeholder="更新时间"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </rj-content-box>

    </el-form>
    <rj-content-box :isTip="false">
      <div class="flex-row-end">
        <el-button @click="goBack()">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </div>
    </rj-content-box>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        roomnum: '',
        actname: '',
        lessonnum: '',
        weeknumid: '',
        usetimeid: '',
        period: '',
        ordernum: '',
        orderstatus: '',
        usestatus: '',
        deleted: '',
        createtime: '',
        updatetime: ''
      },
      dataRule: {
        roomnum: [
          { required: true, message: '教室编号不能为空', trigger: 'blur' }
        ],
        actname: [
          { required: true, message: '活动名称不能为空', trigger: 'blur' }
        ],
        lessonnum: [
          { required: true, message: '课程编号不能为空', trigger: 'blur' }
        ],
        weeknumid: [
          { required: true, message: '周时间id不能为空', trigger: 'blur' }
        ],
        usetimeid: [
          { required: true, message: '使用时间id不能为空', trigger: 'blur' }
        ],
        period: [
          { required: true, message: '周时段不能为空', trigger: 'blur' }
        ],
        ordernum: [
          { required: true, message: '使用人证件号不能为空', trigger: 'blur' }
        ],
        orderstatus: [
          { required: true, message: '预约教室状态 0正在预约 1预约成功 2预约失败不能为空', trigger: 'blur' }
        ],
        usestatus: [
          { required: true, message: '使用状态 0未使用 1使用中不能为空', trigger: 'blur' }
        ],
        deleted: [
          { required: true, message: '逻辑删除不能为空', trigger: 'blur' }
        ],
        createtime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        updatetime: [
          { required: true, message: '更新时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 返回首頁
    goBack () {
      this.$emit('goBack')
    },
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/roomap/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.roomnum = data.data.roomnum
              this.dataForm.actname = data.data.actname
              this.dataForm.lessonnum = data.data.lessonnum
              this.dataForm.weeknumid = data.data.weeknumid
              this.dataForm.usetimeid = data.data.usetimeid
              this.dataForm.period = data.data.period
              this.dataForm.ordernum = data.data.ordernum
              this.dataForm.orderstatus = data.data.orderstatus
              this.dataForm.usestatus = data.data.usestatus
              this.dataForm.deleted = data.data.deleted
              this.dataForm.createtime = data.data.createtime
              this.dataForm.updatetime = data.data.updatetime
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/roomap/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'roomnum': this.dataForm.roomnum,
              'actname': this.dataForm.actname,
              'lessonnum': this.dataForm.lessonnum,
              'weeknumid': this.dataForm.weeknumid,
              'usetimeid': this.dataForm.usetimeid,
              'period': this.dataForm.period,
              'ordernum': this.dataForm.ordernum,
              'orderstatus': this.dataForm.orderstatus,
              'usestatus': this.dataForm.usestatus,
              'deleted': this.dataForm.deleted,
              'createtime': this.dataForm.createtime,
              'updatetime': this.dataForm.updatetime
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  // this.visible = false
                  this.$emit('goBack')
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
