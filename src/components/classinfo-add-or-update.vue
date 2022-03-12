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
                    <el-form-item label="班级号" prop="classid">
                        <el-input v-model="dataForm.classid" placeholder="班级号"></el-input>
                    </el-form-item>
                </el-col>
                                                            <el-col :inline="true" :span="8">
                    <el-form-item label="教师id" prop="teacherid">
                        <el-input v-model="dataForm.teacherid" placeholder="教师id"></el-input>
                    </el-form-item>
                </el-col>
                                                            <el-col :inline="true" :span="8">
                    <el-form-item label="逻辑删除 0正常 1注销" prop="deleted">
                        <el-input v-model="dataForm.deleted" placeholder="逻辑删除 0正常 1注销"></el-input>
                    </el-form-item>
                </el-col>
                                                            <el-col :inline="true" :span="8">
                    <el-form-item label="创建时间" prop="createTime">
                        <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
                    </el-form-item>
                </el-col>
                                                            <el-col :inline="true" :span="8">
                    <el-form-item label="修改时间" prop="updateTime">
                        <el-input v-model="dataForm.updateTime" placeholder="修改时间"></el-input>
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
          classid: '',
          teacherid: '',
          deleted: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          classid: [
            { required: true, message: '班级号不能为空', trigger: 'blur' }
          ],
          teacherid: [
            { required: true, message: '教师id不能为空', trigger: 'blur' }
          ],
          deleted: [
            { required: true, message: '逻辑删除 0正常 1注销不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/classinfo/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.classid = data.data.classid
                this.dataForm.teacherid = data.data.teacherid
                this.dataForm.deleted = data.data.deleted
                this.dataForm.createTime = data.data.createTime
                this.dataForm.updateTime = data.data.updateTime
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
              url: this.$http.adornUrl(`/sys/classinfo/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'classid': this.dataForm.classid,
                'teacherid': this.dataForm.teacherid,
                'deleted': this.dataForm.deleted,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
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
