<template>
  <div>

    <el-page-header @back="goBack()" :content="!dataForm.id ? '修改' : '新增'"></el-page-header>

    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()">

      <el-row :gutter="40">
        <el-col :inline="true" :span="8">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="密码" prop="password">
            <el-input v-model="dataForm.password" placeholder="密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="dataForm.realname" placeholder="真实姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="学校证件号码" prop="schoolcard">
            <el-input v-model="dataForm.schoolcard" placeholder="学校证件号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="dataForm.age" placeholder="年龄"></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="性别 0男 1女" prop="sex">
            <el-input v-model="dataForm.sex" placeholder="性别 0男 1女"></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="-1管理员 1老师 2学生" prop="role">
            <el-input v-model="dataForm.role" placeholder="-1管理员 1老师 2学生"></el-input>
          </el-form-item>
        </el-col>
        <el-col :inline="true" :span="8">
          <el-form-item label="逻辑删除 0正常 1注销 2封禁" prop="deleted">
            <el-input v-model="dataForm.deleted" placeholder="逻辑删除 0正常 1注销 2封禁"></el-input>
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

    </el-form>

    <div class="flex-row-end">
      <el-button @click="goBack()">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        username: '',
        password: '',
        realname: '',
        schoolcard: '',
        age: '',
        sex: '',
        role: '',
        deleted: '',
        createTime: '',
        updateTime: ''
      },
      dataRule: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' }
        ],
        schoolcard: [
          { required: true, message: '学校证件号码不能为空', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别 0男 1女不能为空', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '-1管理员 1老师 2学生不能为空', trigger: 'blur' }
        ],
        deleted: [
          { required: true, message: '逻辑删除 0正常 1注销 2封禁不能为空', trigger: 'blur' }
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
            url: this.$http.adornUrl(`/user/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.username = data.data.username
              this.dataForm.password = data.data.password
              this.dataForm.realname = data.data.realname
              this.dataForm.schoolcard = data.data.schoolcard
              this.dataForm.age = data.data.age
              this.dataForm.sex = data.data.sex
              this.dataForm.role = data.data.role
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
            url: this.$http.adornUrl(`/user/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'username': this.dataForm.username,
              'password': this.dataForm.password,
              'realname': this.dataForm.realname,
              'schoolcard': this.dataForm.schoolcard,
              'age': this.dataForm.age,
              'sex': this.dataForm.sex,
              'role': this.dataForm.role,
              'deleted': this.dataForm.deleted,
              'createTime': this.dataForm.createTime,
              'updateTime': this.dataForm.updateTime
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
