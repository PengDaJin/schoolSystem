<template>
    <div>
    <rj-content-box>
        <el-page-header
                @back="goBack()"
                :content="!dataForm.id ? '修改' : '新增'"
        ></el-page-header>
    </rj-content-box>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()">
        <rj-content-box title="" color="#ff9149">
            <el-row :gutter="40">
                                                                        <el-col :inline="true" :span="8">
                    <el-form-item label="时段名称" prop="useperiod">
                        <el-input v-model="dataForm.useperiod" placeholder="时段名称"></el-input>
                    </el-form-item>
                </el-col>
                                                            <el-col :inline="true" :span="8">
                    <el-form-item label="使用时间" prop="starttime">
                        <el-input v-model="dataForm.starttime" placeholder="使用时间"></el-input>
                    </el-form-item>
                </el-col>
                                                            <el-col :inline="true" :span="8">
                    <el-form-item label="结束时间" prop="endtime">
                        <el-input v-model="dataForm.endtime" placeholder="结束时间"></el-input>
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
          useperiod: '',
          starttime: '',
          endtime: ''
        },
        dataRule: {
          useperiod: [
            { required: true, message: '时段名称不能为空', trigger: 'blur' }
          ],
          starttime: [
            { required: true, message: '使用时间不能为空', trigger: 'blur' }
          ],
          endtime: [
            { required: true, message: '结束时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/timeinfo/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.useperiod = data.data.useperiod
                this.dataForm.starttime = data.data.starttime
                this.dataForm.endtime = data.data.endtime
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
              url: this.$http.adornUrl(`/sys/timeinfo/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'useperiod': this.dataForm.useperiod,
                'starttime': this.dataForm.starttime,
                'endtime': this.dataForm.endtime
              })
            }).then(({data}) => {
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
